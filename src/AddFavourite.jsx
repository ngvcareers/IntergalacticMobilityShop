import React, { useState } from 'react';
import { Alert } from './Alert';
const AddFavourite = ({ resName }) => {
    const [showFavAlert, setShowFavAlert] = useState(false);
    const [favStatus, setFavStatus] = useState(1);
    function handleFav() {
        const getStatus = window.localStorage.getItem(resName);
        if (getStatus === 'true') {
            window.localStorage.setItem(resName, false);
        }
        else {
            window.localStorage.setItem(resName, true);
        }
        setFavStatus((prev) => prev + 3);
    }
    return (
        <>
            {
                showFavAlert
                &&
                <Alert handleClose={() => setShowFavAlert(false)}>
                    Favourites for {resName} updated
                </Alert>}
            <button
                onClick={() => handleFav()}
                style={{
                    background: 'none',
                    color: 'white',
                    border: 'none'
                }}>
                Add to Favourites
                <svg
                    width='1em'
                    height='1em'
                    viewBox='0 0 16 16'
                    className='bi bi-heart-fill'
                    fill={favStatus && window.localStorage.getItem(resName) === 'true' ? 'red' : 'white'}
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                    />
                </svg>
            </button>
        </>
    );
};
export default AddFavourite;