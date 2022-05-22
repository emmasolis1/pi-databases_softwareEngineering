import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";

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

const Login = () => {
	return (
		<>
			<h1>Bienvenido</h1>
			<Formik
				initialValues={{
					usuario: '',
					contrasena: ''
				}}
				validationSchema={Yup.object({
					usuario: Yup.string()
						.max(15, "Tienen que ser 15 caracteres o menos")
						.required("Required"),
					contrasena: Yup.string()
						.max(40, "Tienen que ser 40 caracteres o menos")
						.required("Required")
				})}
				onSubmit={async (values, { setSubmitting}) => {
					await new Promise(r => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
                <Form>
                    <MyTextInput
                        label="Usuario"
                        name="usuario"
                        type="text"
                        placeholder="Gustavo"
                    />
                    <MyTextInput
                        label="contraseña"
                        name="contrasena"
                        type="text"
					/>
					<div>
					<button type="submit">Submit</button>
					</div>
					<button type="register">No tienes cuenta, Registrate acá</button>
                </Form>
			</Formik>
		</>
	);
}

function App() {
	return <Login />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);