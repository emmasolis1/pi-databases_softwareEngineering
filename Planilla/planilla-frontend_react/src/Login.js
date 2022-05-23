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
					<button type="register">
						<Link to="/UserRegistration"><a href className="App-link">Register</a></Link>
					</button>
                </Form>
			</Formik>
		</>
	);
}

export default Login;

/*

function App() {
	return <Login />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

*/
