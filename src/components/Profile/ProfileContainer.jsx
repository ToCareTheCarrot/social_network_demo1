import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { setUserProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount(){
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = this.props.authorizedUserId;
      if(!userId){
        this.props.history.push('/login');
      }
    }
    // userId = !userId ? 2 : userId;
    this.props.setUserProfileThunkCreator(userId);
    this.props.getStatusThunkCreator(userId);
  }

  render(){
    const pr = this.props;
    return (
      <Profile {...pr} profile={pr.profile} status={pr.status} updateStatus={pr.updateStatusThunkCreator}/>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, {setUserProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator}),
  withAuthRedirect,
  withRouter
)(ProfileContainer);


