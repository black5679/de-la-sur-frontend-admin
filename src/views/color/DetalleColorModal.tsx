import { Button, Modal } from "react-bootstrap"
import { FormInput, VerticalForm } from "../../components"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { insertColor, updateColor } from "../../redux/actions";
import { InsertColorRequest } from "../../requests/color/insert-color.request";
import { ColorModel, IColorModel } from "../../models/color.model";
import { UpdateColorRequest } from "../../requests/color/update-color.request";

export enum DetalleColorModalType{
    Registrar = "Registrar",
    Visualizar = "Visualizar",
    Modificar = "Modificar"
}

export interface IDetalleColorModalProps {
    show: boolean,
    toggle: () => void,
    type: DetalleColorModalType
}

const DetalleColorModal = (props: IDetalleColorModalProps) => {
    const [color, setColor] = useState<IColorModel>(new ColorModel());
    const disabled = props.type.toString() === DetalleColorModalType.Visualizar.toString();
    const dispatch = useDispatch<AppDispatch>();

    const save = useCallback(() => {
        switch(props.type){
            case DetalleColorModalType.Registrar.toString():
                dispatch(insertColor(new InsertColorRequest(color)));
                break;
            case DetalleColorModalType.Visualizar.toString():
                dispatch(updateColor(new UpdateColorRequest(color)));
                break;
            case DetalleColorModalType.Modificar.toString():
                dispatch(insertColor(new InsertColorRequest(color)));
                break;
        }
    }, [dispatch, color, props.type])

    const schemaResolver = yupResolver(
        yup.object({
            nombre: yup.string().required("El nombre es requerido"),
            codigoHex: yup.string().required("El color es requerido")
        })
    );

    const handleNombre = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setColor((prevState: IColorModel) => ({ ...prevState, nombre: e.target.value }))
    }, [])

    const handleColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setColor((prevState: IColorModel) => ({ ...prevState, codigoHex: e.target.value }))
    }, [])

    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header onHide={props.toggle} closeButton>
                <h4 className="modal-title">{props.type} Color</h4>
            </Modal.Header>
            <Modal.Body>
                <VerticalForm formClass="row" onSubmit={save} resolver={schemaResolver}>
                    <FormInput
                        label="Nombre"
                        type="text"
                        name="nombre"
                        value={color.nombre}
                        disabled={disabled}
                        onChange={handleNombre}
                        containerClass={"col-6 mb-2"}
                    />
                    <FormInput
                        label="Color"
                        type="color"
                        name="codigoHex"
                        className="w-100"
                        value={color.codigoHex}
                        disabled={disabled}
                        onChange={handleColor}
                        containerClass={"col-6 mb-2"}
                    />
                    <div className="text-end">
                        <Button
                            variant="success"
                            type="submit"
                            className="waves-effect waves-light me-1"
                        >
                            Guardar
                        </Button>
                        <Button
                            variant="danger"
                            className="waves-effect waves-light"
                            onClick={props.toggle}
                        >
                            Cerrar
                        </Button>
                    </div>
                </VerticalForm>
            </Modal.Body>
        </Modal>
    )
}

export default DetalleColorModal;