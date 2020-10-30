import React from 'react';
import c from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';


export const ProfileInfo = props => {
  if(!props.profile){
    return <Preloader />
  }

  const default_photo_url = 'https://images.shoutwiki.com/ytp/thumb/9/97/%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg/300px-%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg';
  const background_photo_url ='https://therightsofnature.org/wp-content/uploads/2018/01/turkey-3048299_1920-1366x550.jpg';
  let photo = props.profile.photos.large;
  photo = !photo ? default_photo_url : photo;

  return (
    <div>
      <div className={c.background_container}>
         <img className={c.backPic} src={background_photo_url} alt='background'/>
      </div>
      <div className={c.descriptionBlock}>
        <div className={c.userpic}>
          <img src={photo} alt='user' />
        </div>
        <div  className={c.textInfoBlock}>
          <div>
            <h2>{props.profile.fullName}</h2>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            <h4>{props.profile.aboutMe}</h4>
          </div>
          <div className={c.generalInfo}>
            <div className={c.generalInfoLeftBlock}>
              <span>День рождения:</span>
              <span>Город:</span>
              <span>Место работы:</span>
              <span>Сайт:</span>
            </div>
            <div className={c.generalInfoRightBlock}>
              <span>24 июня 1994</span>
              <span>Минск</span>
              <span>Беларусбанк</span>
              <span>http/lurkmoar.ru</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

