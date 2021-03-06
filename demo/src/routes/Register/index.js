import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useFeathers } from '@cond/use-feathers';
import { Link, useHistory } from 'react-router-dom';

const Register = ({}) => {
  const { handleSubmit, register, errors, watch } = useForm();
  const { register: userRegister } = useFeathers();
  const history = useHistory();

  const onSubmit = (values) => {
    userRegister(values)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {});
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="with a placeholder"
            innerRef={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            })}
            invalid={errors.email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password placeholder"
            innerRef={register({
              required: 'Required',
            })}
            invalid={errors.password}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Repeat Password</Label>
          <Input
            type="password"
            name="repeatPassword"
            placeholder="password placeholder"
            innerRef={register({
              required: 'Required',
              validate: (value) => value === watch('password'),
            })}
            invalid={errors.repeatPassword}
          />
        </FormGroup>
        <Button type="submit">register</Button>
      </Form>
      <Button color="link">
        <Link to="/login">login</Link>
      </Button>
    </>
  );
};

export default Register;
