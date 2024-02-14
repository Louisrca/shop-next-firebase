"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase-config";

// import { useAuth } from '../context/AuthUserContext';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  // createUserWithEmailAndPassword(auth, email, passwordOne)

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (passwordOne)
        createUserWithEmailAndPassword(auth, email, passwordOne)
          .then(() => {
            console.log("Success. The user is created in Firebase");
            router.push("/login");
          })
          .catch((error) => {
            // An error occurred. Set error message to be displayed to user
            setError(error.message);
          });
      else setError("Password do not match");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="text-center custom-container">
      <Row>
        <Col>
          <Form className="custom-form" onSubmit={onSubmit}>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="signUpEmail" sm={4}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword" sm={4}>
                Password
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword2" sm={4}>
                Confirm Password
              </Label>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Button>Sign Up</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
