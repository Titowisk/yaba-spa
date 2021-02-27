import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import agent from "../../api/agent";
import MyTextInput from "../../common/form/MyTextInput";
import { ILoginUserDTO } from "../../models/User";
import { useStore } from "../../stores/store";

function LoginUser() {
  const { userStore } = useStore();
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string().email("Email must be valid").required(),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Segment>
      <Header content={"Login"} color="teal" />
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore
            .login(values)
            .catch((error) => setErrors({ error: "Invalid email or password" }))
        }
      >
        {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
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
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  basic
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button
              loading={isSubmitting}
              disabled={!dirty || !isValid}
              type="submit"
            >
              Login
            </Button>
            <Button as={NavLink} to="/register-user" primary>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(LoginUser);
