import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// const profilePic = '';
function Profile() {
  const {user} = useContext(AuthContext);
  let nameInitials = user.name[0];
  let fullname = user.name.split(' ');
  nameInitials += fullname[1]? fullname[1].charAt(0) : '';

  return (
    <div className='d-md-block row collapse'>
      <div className='profile-side'>
        <h4 className="your-profile my-3">Your Profile</h4>
        <div className="profile-image rounded-circle border border-light my-3 text-uppercase" >
          <img src='' className='rounded-circle' alt='' />{nameInitials}
        </div>
        <p className="name" title='name'>{user.name}</p>
        <p className="titles mb-0 text-muted">Email</p>
        <p className="email ms-1" title='email'>{user.email}</p>
        <p className="titles mb-0 text-muted">Profession</p>
        <p className="profession ms-1" title='Profession'>{user.occupation}</p>
        <p className="titles mb-0 text-muted">Area</p>
        <p className="course ms-1" title='area'>{user.branch?user.branch:'N/A'}</p>
      </div>
    </div>
  )
}

export default Profile