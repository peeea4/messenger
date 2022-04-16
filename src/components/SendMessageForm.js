import { Button, FormControl, InputGroup, Form } from "react-bootstrap"
import { useState} from 'react';

const SendMessageForm = ({sendMessage}) => {

    const [message, setMessage] = useState("");
    
    return (
        <Form onSubmit={e=> {
            e.preventDefault();
            sendMessage(message)
            setMessage('')
        }}>
            <InputGroup>
                <FormControl placeholder="message..." onChange={e => setMessage(e.target.value)} value={message}>
                    <InputGroup.Append>
                        <Button variant="primary" type="submit" disables={!message}>Send</Button>
                    </InputGroup.Append>
                </FormControl>
            </InputGroup>
        </Form>
    )
}
export default SendMessageForm;