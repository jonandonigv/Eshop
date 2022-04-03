import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <p className="title">List</p>
          <li>
            <PersonOutlineOutlinedIcon className='icon'/>
            <span>Users</span>
          </li>
          <li>
            <StoreMallDirectoryIcon className='icon'/>
            <span>Products</span>
          </li>
          <li>
            <CreditCardIcon className='icon'/>
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className='icon'/>
            <span>Delivery</span>
          </li>
          <p className="title">Usefull</p>
          <li>
            <InsertChartIcon className='icon'/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon className='icon'/>
            <span>Notifications</span>
          </li>
          <p className="title">Service</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon'/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon'/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='icon'/>
            <span>Settings</span>
          </li>
          <p className="title">User</p>
          <li>
            <AccountCircleOutlinedIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppOutlinedIcon className='icon'/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
