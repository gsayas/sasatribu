import React from 'react';
import Loading from 'react-loading';
import {database, ref, set} from '../firebase';
import Button from 'react-bootstrap/Button';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSavingForm: false,
            username: '',
            name: '',
            lastName: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.setState(() => ({ isSavingForm: false }))
        this.save(this.state);
    }   

    save = (data) => {
        set(ref(database, 'users/' + data.username), {
            name: data.name,
            lastName: data.lastName,
        });
    }
    

    render() {
        const {isSavingForm, username, name, lastName} = this.state;
        const isEditMode = false;

        return (
            <div className='user-profile'>
                {isSavingForm === true
                ? <Loading delay={200} type='spin' color='#222' className='loading' />
                : <form onSubmit={this.handleSubmitForm}>         
                    <div>
                        {!isEditMode
                        ?<div>
                        <input
                            name="username"
                            className='username-input'
                            type='text'
                            placeholder='Your Username'
                            value={username}
                            onChange={this.handleInputChange}/>    
                        <input
                            name="name"
                            className='name-input'
                            type='text'
                            placeholder='Your Name'
                            value={name}
                            onChange={this.handleInputChange}/>
                        <input
                            name="lastName"
                            className='lastName"-input'
                            type='text'
                            placeholder='Your Last Name'
                            value={lastName}
                            onChange={this.handleInputChange}
                        />
                        </div>:''}
                        <Button type="submit" disabled={isSavingForm}>
                            Submit
                        </Button>
                    </div>
                </form>}
            </div>
        )
    }
}

export default UserProfile