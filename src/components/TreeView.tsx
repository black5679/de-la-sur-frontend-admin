import React, { useState } from "react";

// Modelo de datos del árbol
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

// Props para el componente TreeView
interface TreeViewProps {
  nodes: TreeNode[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

// Componente TreeView
const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  selectedIds,
  onSelectionChange,
}) => {
  // Estado para manejar la visibilidad de los hijos de cada nodo
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());

  // Manejar la expansión/contracción de un nodo
  const handleToggleNode = (nodeId: string) => {
    setOpenNodes((prevOpenNodes) => {
      const newOpenNodes = new Set(prevOpenNodes);
      if (newOpenNodes.has(nodeId)) {
        newOpenNodes.delete(nodeId); // Cerrar el nodo si ya está abierto
      } else {
        newOpenNodes.add(nodeId); // Abrir el nodo si no está abierto
      }
      return newOpenNodes;
    });
  };

  // Manejar selección
  const handleToggle = (node: TreeNode, isChecked: boolean) => {
    const updateSelection = (nodes: TreeNode[]): string[] => {
      let updated: string[] = [];
      for (const child of nodes) {
        updated.push(child.id);
        if (child.children) {
          updated = [...updated, ...updateSelection(child.children)];
        }
      }
      return updated;
    };

    // Si el nodo tiene hijos, selecciona/deselecciona recursivamente
    const newSelectedIds = isChecked
      ? [
          ...Array.from(
            new Set([
              ...selectedIds,
              node.id,
              ...(node.children ? updateSelection(node.children) : []),
            ])
          ),
        ]
      : selectedIds.filter(
          (id) =>
            id !== node.id && // Eliminar este nodo
            (!node.children || !updateSelection(node.children).includes(id)) // Eliminar hijos
        );

    onSelectionChange(newSelectedIds);
  };

  // Renderizar nodos recursivamente
  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
        {nodes.map((node) => (
          <li key={node.id}>
            <div className="d-flex align-items-center">
              {node.children && (
                <button
                  onClick={() => handleToggleNode(node.id)}
                  className={`btn p-0 btn-sm ${
                    openNodes.has(node.id) ? "btn-danger" : "btn-primary"
                  } mr-2`}
                  style={{ width: 19, height: 19, marginRight: 4}}
                >
                  {openNodes.has(node.id) ? "-" : "+"}
                </button>
              )}
              <input
                className="form-check-input"
                type="checkbox"
                style={{marginRight: 4}}
                checked={selectedIds.includes(node.id)}
                onChange={(e) => handleToggle(node, e.target.checked)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                {node.label}
              </label>
            </div>
            {node.children &&
              openNodes.has(node.id) &&
              renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderTree(nodes)}</div>;
};

// Ejemplo de uso
const App: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const treeData: TreeNode[] = [
    {
      id: "1",
      label: "Raíz",
      children: [
        {
          id: "1.1",
          label: "Hijo 1",
          children: [
            { id: "1.1.1", label: "Nieto 1" },
            { id: "1.1.2", label: "Nieto 2" },
          ],
        },
        { id: "1.2", label: "Hijo 2" },
      ],
    },
    {
      id: "2",
      label: "Raíz 2",
      children: [{ id: "2.1", label: "Hijo 3" }],
    },
  ];

  return (
    <div>
      <h1>Tree View con Checkboxes</h1>
      <TreeView
        nodes={treeData}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
      <div>
        <h3>Seleccionados:</h3>
        <pre>{JSON.stringify(selectedIds, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
