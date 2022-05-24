import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import { Link } from "react-router-dom";
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

const Login = () => {
	return (
		<div className="App">
			<div className="App-header">
				<h1>Bienvenido</h1>
				<Formik
					initialValues={{
						usuario: '',
						contrasena: ''
					}}
					validationSchema={Yup.object({
						usuario: Yup.string()
							.max(15, "Tienen que ser 15 caracteres o menos")
							.required("Requerido"),
						contrasena: Yup.string()
							.max(40, "Tienen que ser 40 caracteres o menos")
							.required("Requerido")
					})}
					onSubmit={async (values, { setSubmitting}) => {
						await new Promise(r => setTimeout(r, 500));
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}}
				>
					<Form>
				
					<div>
						<MyTextInput
							label="Usuario"
							name="usuario"
							type="text"
							placeholder="Gustavo"
						/>
					</div>
					<div>
						<MyTextInput
							label="Contrasena"
							name="contrasena"
							type="text"
						/>
					</div>
					<div>
						<button type="submit">
							<Link to="/Project"><a href className="App-link">Acceder</a></Link>
						</button>
						<button type="register">
							<Link to="/UserRegistration"><a href className="App-link">Registro</a></Link>
						</button>
					</div>
					</Form>
				</Formik>
			</div>
		</div>	
	);
}

export default Login;

