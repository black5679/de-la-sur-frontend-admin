import React from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";

interface VerticalFromProps<TFormValues> {
  defaultValues?: any;
  resolver?: Resolver<TFormValues>;
  children?: any;
  onSubmit: SubmitHandler<TFormValues>;
  formClass?: string;
}

const VerticalForm = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  defaultValues,
  resolver,
  children,
  onSubmit,
  formClass,
}: VerticalFromProps<TFormValues>) => {
  /*
   * form methods
   */
  const methods = useForm<TFormValues>({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props && child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                    errors,
                    control,
                    setValue
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default VerticalForm;
