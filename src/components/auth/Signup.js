import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context'
import { Container } from 'react-bootstrap'

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [unmounted, setUnmounted] = useState({});
    const { signup } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords Don't Match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch (error) {
            setError("Failed To Sign Up")
        }
        setLoading(false)
    }

    useEffect(() => {
        return () => {
            setUnmounted({})
        }
    }, [])

    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '100vh' }} >
                <div className='w-100' style={{ maxWidth: '400px' }} >

                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4' >Sign Up</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id='email' className='mb-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' required ref={emailRef} autoComplete="off" />
                                </Form.Group>
                                <Form.Group id='password' className='mb-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' required ref={passwordRef} autoComplete="off" />
                                </Form.Group>
                                <Form.Group id='passwordConfirm' className='mb-2'>
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type='password' required ref={passwordConfirmRef} autoComplete="off" />
                                </Form.Group>

                                <Button disabled={loading} className='w-100 mt-3 btn-gen-color' type='submit'>Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Already Have An Account <Link to='/login'>Log In</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Signup;
