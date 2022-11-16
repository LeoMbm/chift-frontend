import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({user, Logged}) => {



    return (
        <div className="mx-auto">
        <div className="mockup-code w-fit">

          <pre data-prefix="$" >
            <code>Hey ! {user.first_name}. This is your account details</code>
          </pre>
          <pre data-prefix="$">
            <code>First Name: {user.first_name}</code>
          </pre>
          <pre data-prefix="$">
            <code>Last Name: {user.last_name}</code>
          </pre>
          <pre data-prefix="$">
            <code>Email: {user.email}</code>
          </pre>
          <pre data-prefix="$">
            <code>First Name: {user.first_name}</code>
          </pre>
        </div>
      </div>
    );
};

export default Profile;