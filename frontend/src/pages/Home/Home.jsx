import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { Toast } from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNOteImg from '../../assets/Creating Note.png'

function Home() {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });


  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false);




  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };


  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',

    });
  };


  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  //delete note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      error.response &&
        error.response.data &&
        error.response.data.message;

      console.log("An unexpected error occurred. Please try again.");
    }
  };

  //search note 
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCleanSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }


  useEffect(() => {
    getAllNotes()
    getUserInfo()
    return () => { }
  }, [])


  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleCleanSearch={handleCleanSearch} />
      <div className='container mx-auto '>

        {allNotes.length > 0 ? <div className='grid grid-cols-3 gap-4 mt-8'>

          {allNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => { }} />

          ))}

        </div> : <EmptyCard imgSrc={AddNOteImg}
          message={`Start creating your first note! Click the \'Add\' button to jot down your thoughts, ideas, and reminders. Let's get started!`} />}

      </div>
      <button className='w-16 h-16 flex items-center   justify-center rounded-2xl bg-[#2885ff] hover:bg-blue-600 absolute right-10 top-150'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}>
        <MdAdd className='text-[32px] text-white ' />

      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage} />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

    </>
  )
}

export default Home