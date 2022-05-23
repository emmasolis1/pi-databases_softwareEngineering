import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
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
  color: var(--blue);
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
        <>
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
                        .max(9, "Tiene que ser 9 digitos")
                        .required("Required"),
                    nombre: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .required("Required"),
                    apellido1: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .required("Required"),
                    apellido2: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .required("Required"),
                    contrasena: Yup.string()
                        .max(40, "Tiene que ser 40 caracteres o menos")
                        .required("Required"),
                    telefono: Yup.number()
                        .max(8, "Tiene que ser de 8 digitos")
                        .required("Required"),
                    provincia: Yup.string()
                        .max(15, "Tiene que ser 15 caracteres o menos")
                        .lowercase("Escribir en minuscula todo el nombre")
                        .required("Required"),
                    canton: Yup.string()
                        .max(20, "Tiene que ser 20 caracteres o menos")
                        .lowercase("Escribir en minuscula todo el nombre")
                        .required("Required"),
                    codigoPostal: Yup.number()
                        .max(5, "Tiene que ser 5 digitos")
                        .required("Required"),
                    tipoUsuario: Yup.string()
                        .oneOf(
                            ["Empleador", "Empleado"],
                            "Invalid Job Type"
                        )
                        .required("Required")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 10));
                    setSubmitting(false);
                }}
            >
                <Form>
                    <MyTextInput
                        label="Cedula"
                        name="cedula"
                        type="number"
                        placeholder="117820230"
                    />
                    <MyTextInput
                        label="Nombre"
                        name="nombre"
                        type="text"
                        placeholder="Gustavo"
                    />
                    <MyTextInput
                        label="Primer Apellido"
                        name="apellido1"
                        type="text"
                        placeholder="Salas"
                    />
                    <MyTextInput
                        label="Segundo Apellido"
                        name="apellido2"
                        type="text"
                        placeholder="Foster"
                    />
                    <MyTextInput
                        label="Contraseña"
                        name="contrasena"
                        type="text"
                    />
                    <MyTextInput
                        label="Teléfono"
                        name="telefono"
                        type="number"
                        placeholder="89227820"
                    />
                    <MyTextInput
                        label="Provincia"
                        name="provincia"
                        type="texto"
                        placeholder="san jose"
                    />
                    <MyTextInput
                        label="Cantón"
                        name="canton"
                        type="texto"
                        placeholder="puriscal"
                    />
                    <MyTextInput
                        label="Código Postal"
                        name="codigoPostal"
                        type="number"
                        placeholder="11011"
                    />
                    <MySelect label="Tipo de Usuario" name="tipoUsuario">
                        <option value="">Escoja su tipo de usuario</option>
                        <option value="Empleador">Empleador</option>
                        <option value="Empleado">Empleado</option>
                    </MySelect>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default RegistrationForm;

/*

function App() {
    return <RegistrationForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

*/
