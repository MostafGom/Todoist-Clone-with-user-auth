import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context'

function ForgotPassword() {

    const emailRef = useRef()
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth()
    const [unmounted, setUnmounted] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMsg('Check Your Mail Inbox')

        } catch (error) {
            setError("Failed To Reset Password")
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
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4' >Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {msg && <Alert variant='success'>{msg}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required ref={emailRef} autoComplete="off" />
                        </Form.Group>

                        <Button disabled={loading} className='w-100 mt-3 btn-gen-color' type='submit'>Reset Password</Button>
                    </Form>

                    <div className='w-100 text-center mt-4'>
                        <Link to='/login'>Log In</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default ForgotPassword;
