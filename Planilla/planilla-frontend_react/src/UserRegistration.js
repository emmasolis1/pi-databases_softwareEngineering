import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import "./components/GeneralStyle.css";
import "./components/StyleComponents.css";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// Styled components ....
const StyledSelect = styled.select`
    font-size: 20px;
    color: black;
    margin: 2mm;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
};

const RegistrationForm = () => {
    return (    
        <div className="App-header">
            <h1>Llene los espacios en blanco para registrarse</h1>
            <Formik
                initialValues={{
                    cedula: '',
                    nombre: '',
                    contrasena: '',
                    apellido1: '',
                    apellido2: '',
                    telefono: '',
                    provincia: '',
                    canton: '',
                    codigoPostal: '',
                    tipoUsuario: ''
                }}
                validationSchema={Yup.object({
                    cedula: Yup.string()
                        .min(9, "Tiene que ser 9 digitos")
                        .max(9, "Tiene que ser 9 digitos")
                        .required("Requerido"),
                    nombre: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .required("Requerido"),
                    apellido1: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .required("Requerido"),
                    apellido2: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .required("Requerido"),
                    contrasena: Yup.string()
                        .max(40, "Tiene que ser 40 caracteres o menos")
                        .required("Requerido"),
                        
                    telefono: Yup.string()
                        .min(8, "Tiene que ser 8 digitos")
                        .max(8, "Tiene que ser de 8 digitos")
                        .required("Requerido"),
                    provincia: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .lowercase("Escribir en minuscula todo el nombre")
                        .required("Requerido"),
                    canton: Yup.string()
                        .max(20, "Tiene que ser 20 caracteres o menos")
                        .lowercase("Escribir en minuscula todo el nombre")
                        .required("Requerido"),
                    codigoPostal: Yup.string()
                        .min(5, "Tiene que ser 5 digitos")
                        .max(5, "Tiene que ser 5 digitos")
                        .required("Requerido"),
                    tipoUsuario: Yup.string()
                        .oneOf(
                            ["Empleador", "Empleado"],
                            "tipo de trabajador invalido"
                        )
                        .required("Requerido")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 10));
                    setSubmitting(false);
                }}
            >
                <Form>
                    <div>
                        <MyTextInput
                            label="Cédula"
                            name="cedula"
                            type="number"
                            placeholder="117820230"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Nombre"
                            name="nombre"
                            type="text"
                            placeholder="Gustavo"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Primer Apellido"
                            name="apellido1"
                            type="text"
                            placeholder="Salas"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Segundo Apellido"
                            name="apellido2"
                            type="text"
                            placeholder="Foster"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Contraseña"
                            name="contrasena"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Teléfono"
                            name="telefono"
                            type="number"
                            placeholder="89227820"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Provincia"
                            name="provincia"
                            type="text"
                            placeholder="san jose"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Cantón"
                            name="canton"
                            type="text"
                            placeholder="puriscal"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            label="Código Postal"
                            name="codigoPostal"
                            type="number"
                            placeholder="11011"
                        />
                    </div>
                    <div>
                        <MySelect label="Tipo de Usuario" name="tipoUsuario">
                            <option value="">Escoja su tipo de usuario</option>
                            <option value="Empleador">Empleador</option>
                            <option value="Empleado">Empleado</option>
                        </MySelect>
                    </div>
                    <div>
                        <button type="submit">
                            <Link to="/Login"><a href className="App-link">Registrarse</a></Link>
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default RegistrationForm;
