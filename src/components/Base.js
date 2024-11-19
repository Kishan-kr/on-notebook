import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from "./Sidebar";

function Base() {
	const { isLoggedin, user } = useContext(AuthContext);
	const [hide, setHide] = useState(true);

	const openNav = () => {
		setHide(false);
	}

	const closeNav = () => {
    setHide(true);
  }

	return (
		<>
			<div className='base row'>
				<aside className={`nav-link col-md-2 col-sm-3 bg-blue p-2 px-4 d-flex flex-column ${hide? 'hide' : ''}`}>
					<Sidebar closeNav={closeNav}/>
				</aside>

				<main className="col-md-10 col-sm-9 bg-white p-0">

					<div className="upper bg-dark text-light d-flex justify-content-between">
						{ !isLoggedin ? <button className="open-nav m-4 btn btn-dark"  onClick={openNav}>
							<i className="fa-solid fa-bars"></i>
						</button> : <></>}
					</div>

					{isLoggedin ?
						<div className={`profile d-flex align-items-center ps-4`}>
							<button className="open-nav me-2 btn btn-dark" onClick={openNav}>
								<i className="fa-solid fa-bars"></i>
							</button>
							<div className="profile-image border border-light text-uppercase">
								<img src={user.pic} alt="" style={{width: '62px'}}/>
							</div>
							<div className="d-flex flex-column px-1">
								<p className="name soft-white mx-2 fs-5 m-0 ">{user.name}</p>
								<p className="email mx-2 m-0 ">{user.email}</p>
							</div>
							<button className="change btn ms-2" title='Show Profile' data-bs-toggle="modal" data-bs-target="#profile">
								<i className="fa-solid fa-chevron-down grey-text"></i>
							</button>
						</div> :
						<></>
					}

					<Outlet />
					{/* <nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><a href="/">Home</a></li>
								<li className="breadcrumb-item active" aria-current="page">Library</li>
							</ol>
						</nav> */}

					<Profile />
				</main>
			</div>
		</>
	)
}


function Profile() {
	const { user, setUser, updatePic, updateDetails } = useContext(AuthContext);
	const [editName, setEditName] = useState(false);
	const [editProf, setEditProf] = useState(false);
	const [uploading, setUploading] = useState(false);

	const uploadPic = async (picture) => {
		setUploading(true);
		if (picture === undefined) console.log('pic not available');
		if (picture.type === 'image/png' || picture.type === 'image/jpeg') {
			const data = new FormData();
			data.append("file", picture);
			data.append("upload_preset", "onNotebook");
			var res = await fetch("https://api.cloudinary.com/v1_1/kishan-kumar/image/upload", {
				method: "POST",
				body: data,
			})
			res = await res.json();
			if (res) {
				const imageUrl = await res.url.toString();
				setUser({...user, pic: imageUrl});
				console.log(updatePic(imageUrl));

			} else {
				console.log("Error while uploading picture");
			}
		}
		else {
			console.log("File type not matched")
			return;
		}
		setUploading(false);
	}

	return (
		<div className="modal fade" id="profile" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalTitle" aria-hidden="true">
			<div className="modal-dialog modal-sm modal-dialog-centered">
				<div className="modal-content py-2">
					<div className="modal-header">
						<h5 id="modalTitle">Profile</h5>

						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">

						<div className="pic-box mx-auto">
							<div className="profile-image border border-light text-uppercase mb-4 mx-auto">
								<img src={user.pic} alt="" style={{width:'92px'}}/>
								<div className={`${uploading ? "loader" : ""}`}></div>

								<input
									type="file"
									accept="image/jpeg, image/png"
									id="pic"
									onChange={(e) => { uploadPic(e.target.files[0]) }}
								/>
							</div>
							<label htmlFor="pic" className="edit-pic p-1" role="button">
								<i className="fa-solid fa-pencil"></i>
							</label>
						</div>

						<label htmlFor="name" >Name</label>
						<div className="d-flex justify-content-between">
							<input
								disabled={!editName}
								id="name"
								className="name mb-3"
								onChange={(e) => setUser({ ...user, name: e.target.value })}
								onBlur={() => {setEditName(false); updateDetails();}}
								value={user.name}
							/>
							<label
								htmlFor="name"
								className="p-2"
								role="button"
								onClick={() => setEditName(true)}
							>
								<i className="fa-solid fa-pencil"></i>
							</label>
						</div>

						<label htmlFor="email" >Email</label>
						<div className="d-flex justify-content-between">
							<p className="email">{user.email}</p>
						</div>

						<label htmlFor="profession" >Profession</label>
						<div className="d-flex justify-content-between ">
							<input
								disabled={!editProf}
								id="profession"
								className="mb-3"
								onChange={(e) => setUser({ ...user, profession: e.target.value })}
								value={user.profession}
								onBlur={() => {setEditProf(false); updateDetails();}}
							/>
							<label
								className="p-2"
								htmlFor="profession"
								role="button"
								onClick={() => setEditProf(true)}
							>
								<i className="fa-solid fa-pencil"></i>
							</label>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default Base;