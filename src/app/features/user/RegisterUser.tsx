import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import agent from "../../api/agent";
import MyTextInput from "../../common/form/MyTextInput";
import { ISignInUserDTO } from "../../models/User";

export const RegisterUser = () => {
  const history = useHistory();
  const validationSchema = Yup.object({
    userName: Yup.string().required("Name is required"),
    email: Yup.string().email("Email must be valid").required(),
    password: Yup.string().required("Password is required"),
  });

  function handleFormSubmit(values: any) {
    let userDTO: ISignInUserDTO = {
      name: values.userName,
      email: values.email,
      password: values.password,
    };
    agent.Users.SignIn(userDTO).then((resp) => {
      history.push("/home");
    });
  }

  return (
    <Segment>
      <Header content="Register User" color="teal" />
      <Formik
        validationSchema={validationSchema}
        initialValues={{}}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput
              label="Full Name"
              type="text"
              name="userName"
              placeholder="write your name"
            />
            <MyTextInput
              label="Email"
              type="email"
              name="email"
              placeholder="example@email.com"
            />
            <MyTextInput
              label="Password"
              type="password"
              name="password"
              placeholder="your password"
            />
            <Button disabled={!dirty || !isValid} type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
