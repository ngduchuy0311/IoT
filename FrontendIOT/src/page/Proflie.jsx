import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
function Profile() {

  return (
    <div className="mx-[10%]">



      <div className='flex mx-20 gap-[60px] mt-[100px] shadow-md px-9 pb-8 rounded-lg'>
        <div className='flex-1'>
          <h1 className='text-[30px] font-medium mb-10 text-sky-400'>MY PROFILE</h1>
          <p className='text-justify text-[20px] mb-[100px]'>Xin chào! Tôi là Nguyễn Đức Huy. Tôi đến từ Hưng Yên và hiện tại tôi đang sống và học tập tại Hà Nội. Tôi đang học ở Học viện Công nghệ Bưu chính viễn thông(PTIT)
          </p>
          <div className='flex justify-center'><a className='text-[25px] bg-sky-400 px-5 py-3 rounded-lg text-white hover:bg-black' href="https://github.com/ngduchuy0311/IoTfull" target="_blank">Link github</a></div>
        </div>
        <div className='flex-1'>
          <img src="https://th.bing.com/th/id/OIP.JBpgUJhTt8cI2V05-Uf53AHaG1?w=238&h=220&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" />
        </div>
        <div className='flex-1' >
          <div>
          <h1 className='text-[30px] font-medium mb-10 text-sky-400'>PERSONAL IMFORMATION</h1>
          <div className='flex border-b-2'>
            <p className='text-[20px] py-3 mx-2'>Name: </p>
            <p className='text-[20px] py-3 mx-2'>Nguyễn Đức Huy</p>
          </div>
          <div className='flex border-b-2'>
            <p className='text-[20px] py-3 mx-2'>Age: </p>
            <p className='text-[20px] py-3 mx-2'>22 </p>
          </div>
          <div className='flex border-b-2'>
            <p className='text-[20px] py-3 mx-2'>Phone: </p>
            <p className='text-[20px] py-3 mx-2'>0325***996</p>
          </div>
          <div className='flex border-b-2'>
            <p className='text-[20px] py-3 mx-2'>Email: </p>
            <p className='text-[20px] py-3 mx-2'>huynd.hy@gmail.com</p>
          </div>
          <div className='flex border-b-2'>
            <p className='text-[20px] py-3 mx-2'>Address: </p>
            <p className='text-[20px] py-3 mx-2'>Hà Nội</p>
          </div>
          <div className='flex justify-evenly mt-10'>
            <a className='shadow-md rounded-full p-2 ' href="https://www.facebook.com/profile.php?id=100039354246543" target='_blank'><FaFacebook className='w-10 h-10 text-sky-400  ' /></a>
            <a className='shadow-md rounded-full p-2' href="https://www.youtube.com/"  target='_blank'><FaYoutube className='w-10 h-10 text-sky-400  ' /></a>
            <a className='shadow-md rounded-full p-2' href="https://www.youtube.com/"  target='_blank'><FaInstagramSquare className='w-10 h-10 text-sky-400  ' /></a>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
