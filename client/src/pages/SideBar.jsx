import { Business, Group, LogoutOutlined, PersonAddAlt } from '@mui/icons-material';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logOutUser } from '../redux/features/user';
const MobileContainer = styled.div`

    width:15.75rem;
    padding: 20px 0;
    margin-top: 60px;
    height:calc( 100vh - 60px);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #023047; 
    transition: all 0.4s ease;
`
const Container = styled.div`
    width:15.75rem;
    padding: 20px 0;
    margin-top: 30px;
    //background-color: #fff;
    height:calc( 100vh - 40px);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #023047;
    transition: all 0.5 ease-in-out;
   @media screen and (max-width: 768px) {
    transform: translateX(-100%);
    left: -15.75rem;
   }
`

const List = styled.ul`

list-style: none;
padding:0.5rem;
margin: 0;
`

const ListItem = styled.li`

border-radius: 10px;
color: #8E92BC;

&:hover::before {
    content: attr(title);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    background-color: #000;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
  }
`

const ListItemLogOut = styled.li`
display:flex;
padding:10px 20px ;
margin-bottom: 10px;
position:absolute;
margin-bottom:40px;
bottom:0;
/* background-color: #F5F5F7; */
border-radius: 5px;
font-weight: 400;
/* color: #141522; */
cursor: pointer;
color:#fff; 
position: absolute;
bottom: 0;

&:hover, &:focus{
    color: #18616C !important;
    background-color: rgba(211, 248, 255,0.4) !important;
};

`
const ListWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: canter;
padding:10px ;
height: 100%; 
width:100%;  
position: relative;

`
export const SideBar = () => {
    const { t } = useTranslation('global')
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user?.user);
    const navigate = useNavigate()
    return (
        <Container>
            <ListWrapper>
                <List>
                    {user?.role === 'staff' &&
                        <>

                        <ListItem><NavLink className={'nav-link'} to='/booking'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.booking')}</NavLink></ListItem>  
                        <ListItem><NavLink className={'nav-link'} to='/history'><RestoreOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.history')}</NavLink></ListItem>

                        </>
                    }

                    {user?.role === 'staff-manager' &&
                        <>
                        <ListItem><NavLink className={'nav-link'} to={'/pending-user-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.pending')}</NavLink></ListItem>

                        <ListItem><NavLink className={'nav-link'} to='/requests-history'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.history')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to='/petrol-request'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.petrolRequest')}</NavLink></ListItem>

                        </>
                    }
                    {user?.role === 'transport-manager' &&
                        <>

                        <ListItem><NavLink className={'nav-link'} to='/requests'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.requests')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to='/pending-requests'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.pendingRequests')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/add-new-car'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.AddnewCar')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to='/add-new-driver'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.AddnewDriver')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/available-car'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.AvailableCar')}</NavLink></ListItem>


                        </>
                    }
                    {user.role === 'admin' &&
                        <>

                        <ListItem ><NavLink className={'nav-link'} to='/user-list'> <Group style={{ marginRight: '10px' }} />{t("sidebar.user")}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/pending-user-register-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t("sidebar.pendingRequests")}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/user-register-request'} ><PersonAddAlt style={{ marginRight: '10px' }} />{t("sidebar.userRegisterRequests")}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/department'} ><Business style={{ marginRight: '10px' }} />{t("sidebar.department")}</NavLink></ListItem>

                        </>
                    }
                    <ListItemLogOut title="logout" onClick={() => {

                        dispatch(logOutUser())
                        navigate('/home')

                    }}> <LogoutOutlined style={{ marginRight: '10px' }} />{t('sidebar.logOut')}</ListItemLogOut>

                </List>
            </ListWrapper>
        </Container>


    )
}

export const MobileScreenSideBar = ({ isMenuOpen }) => {
    const { t } = useTranslation('global')
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user?.user);
    const navigate = useNavigate()
    return <MobileContainer>
        <ListWrapper>
            <List>
                {user?.role === 'staff' &&
                    <>

                    <ListItem><NavLink className={'nav-link'} to='/booking'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.booking')}</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to='/history'><RestoreOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.history')}</NavLink></ListItem>

                    </>
                }

                {user?.role === 'staff-manager' &&
                    <>
                    <ListItem><NavLink className={'nav-link'} to={'/pending-user-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.pending')}</NavLink></ListItem>

                    <ListItem><NavLink className={'nav-link'} to='/requests-history'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.history')}</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to='/petrol-request'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.petrolRequest')}</NavLink></ListItem>

                    </>
                }
                {user?.role === 'transport-manager' &&
                    <>

                        <ListItem><NavLink className={'nav-link'} to='/requests'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.requests')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to='/pending-requests'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.pendingRequests')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/add-new-car'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.AddnewCar')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to='/add-new-driver'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.AddnewDriver')}</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/available-car'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t('sidebar.AvailableCar')}</NavLink></ListItem>


                    </>
                }
                {user.role === 'admin' &&
                    <>

                    <ListItem ><NavLink className={'nav-link'} to='/user-list'> <Group style={{ marginRight: '10px' }} />{t("sidebar.user")}</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to={'/pending-user-register-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />{t("sidebar.pendingRequests")}</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to={'/user-register-request'} ><PersonAddAlt style={{ marginRight: '10px' }} />{t("sidebar.userRegisterRequests")}</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to={'/department'} ><Business style={{ marginRight: '10px' }} />{t("sidebar.department")}</NavLink></ListItem>

                    </>
                }
                <ListItemLogOut title="logout" onClick={() => {

                    dispatch(logOutUser())
                    navigate('/login')

                }}> <LogoutOutlined style={{ marginRight: '10px' }} />{t('sidebar.logOut')}</ListItemLogOut>

            </List>
        </ListWrapper>

    </MobileContainer>
}

