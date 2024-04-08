import React, { useState, InputHTMLAttributes } from "react";
import { Form, InputGroup } from "react-bootstrap";
import classNames from "classnames";

import { FieldErrors, Control } from "react-hook-form";
import Select from "react-select";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  refCallback?: any;
  errors: FieldErrors;
  control?: Control<any>;
  register?: any;
  className?: string;
}

/* Password Input */
const PasswordInput = ({
  name,
  placeholder,
  refCallback,
  errors,
  control,
  register,
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <InputGroup className="mb-0">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          id={name}
          as="input"
          ref={(r: HTMLInputElement) => {
            if (refCallback) refCallback(r);
          }}
          className={className}
          isInvalid={errors && errors[name] ? true : false}
          {...(register ? register(name) : {})}
          autoComplete={name}
        />
        <div
          className={classNames("input-group-text", "input-group-password", {
            "show-password": showPassword,
          })}
          data-password={showPassword ? "true" : "false"}
        >
          <span
            className="password-eye"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          ></span>
        </div>
      </InputGroup>
    </>
  );
};

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  register?: any;
  setValue?: any;
  errors?: FieldErrors;
  control?: Control<any>;
  className?: string;
  labelClassName?: string;
  containerClass?: string;
  refCallback?: any;
  children?: any;
  rows?: string;
  isDisabled?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  options?: any;
  value?: any;
}

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  register,
  setValue,
  errors,
  control,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  rows,
  value,
  isDisabled,
  hideSelectedOptions,
  closeMenuOnSelect,
  isMulti,
  options,
  ...otherProps
}: FormInputProps) => {
  // handle input type
  const comp =
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input";

  return (
    <>
      {type === "hidden" ? (
        <input
          type={type}
          name={name}
          {...(register ? register(name) : {})}
          {...otherProps}
        />
      ) : (
        <>
          {type === "password" ? (
            <>
              <Form.Group className={containerClass}>
                {label ? (
                  <>
                    {" "}
                    <Form.Label className={labelClassName}>
                      {label}
                    </Form.Label>{" "}
                    {children}{" "}
                  </>
                ) : null}
                <PasswordInput
                  name={name}
                  placeholder={placeholder}
                  refCallback={refCallback}
                  errors={errors!}
                  register={register}
                  className={className}
                />

                {errors && errors[name] ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors[name]["message"]}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </>
          ) : (
            <>
              {type === "checkbox" || type === "radio" ? (
                <>
                  <Form.Group className={containerClass}>
                    <Form.Check
                      type={type}
                      label={label}
                      name={name}
                      id={name}
                      ref={(r: HTMLInputElement) => {
                        if (refCallback) refCallback(r);
                      }}
                      className={className}
                      isInvalid={errors && errors[name] ? true : false}
                      {...(register ? register(name) : {})}
                      {...otherProps}
                    />

                    {errors && errors[name] ? (
                      <Form.Control.Feedback type="invalid">
                        {errors[name]["message"]}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </>
              ) : (
                <>
                  {type === "select" ? (
                    <>
                      <Form.Group className={containerClass}>
                        {label ? (
                          <Form.Label className={labelClassName}>{label}</Form.Label>
                        ) : null}
                        <Select
                          type={type}
                          placeholder={placeholder}
                          name={name}
                          value={value}
                          id={name}
                          isDisabled={isDisabled}
                          hideSelectedOptions={hideSelectedOptions}
                          closeMenuOnSelect={closeMenuOnSelect}
                          options={options}
                          isFocused={true}
                          isMulti={isMulti}
                          classNamePrefix={errors && errors[name] ? 'is-invalid' : ''}
                          ref={(r: HTMLInputElement) => {
                            if (refCallback) refCallback(r);
                          }}
                          setValue={setValue(name, value || [])}
                          {...(register ? register(name) : {})}
                          {...otherProps}
                        />
                        {errors && errors[name] ? (
                          <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                            {errors[name].message}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </>
                  ) : (
                    <Form.Group className={containerClass}>
                      {label ? (
                        <Form.Label className={labelClassName}>{label}</Form.Label>
                      ) : null}

                      <Form.Control
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        id={name}
                        as={comp}
                        ref={(r: HTMLInputElement) => {
                          if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={errors && errors[name] ? true : false}
                        {...(register ? register(name) : {})}
                        rows={rows}
                        {...otherProps}
                        autoComplete={name}
                      >
                        {children ? children : null}
                      </Form.Control>

                      {errors && errors[name] ? (
                        <Form.Control.Feedback type="invalid">
                          {errors[name]["message"]}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FormInput;
