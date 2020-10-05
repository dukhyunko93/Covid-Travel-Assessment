import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {Layer} from 'baseui/layer';

/*ToDo Refactor
1. Update all href to use React Router for <Link ="/" > tags. 
2. Add Profile redirect
3. Chop down unnecessary bits of code and make it look cleaner.
*/



import {
  ChevronDown,
  Delete,
  Overflow as UserIcon,
  Upload as Icon,
} from 'baseui/icon';

import {
  Unstable_AppNavBar as AppNavBar,
  POSITION,
} from 'baseui/app-nav-bar';
import { Link } from 'react-router-dom';
function renderItem(item) {
  return item.label;
}

function renderSavedTrips(){
  return  <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
   href={'/savedtrips'}
>
  Saved Trips
</StyledLink>
} 

function renderCreateTrip(){
  return  <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
   href={'/map'}
>
  Assess Trip
</StyledLink>
} 

function renderLogin() {
  return <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
  href={'/login'}
>
  Log In
</StyledLink>
}

function renderSignUp() {
  return <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
  href={'/signup'}
>
  Sign Up
</StyledLink>
}


const appDisplayName = (
  <StyledLink
    $style={{
      textDecoration: 'none',
      color: 'inherit',
      ':hover': {color: 'inherit'},
      ':visited': {color: 'inherit'},
    }}
    href={'/'}
  >
    Covid Hater{" "}<span role="img" aria-label="virus">🦠</span>: Travel Risk Assessment Tool
  </StyledLink>
);

const MAIN_NAV = [

  {
    icon: Icon,
    item: {label: 'Travel'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    navPosition: {desktop: POSITION.horizontal},
    nav: [
      {
        icon: Icon,
        item: {label: 'Create Trip'},
        mapItemToNode: renderCreateTrip,
        mapItemToString: renderItem,
      },
      {
        icon: Icon,
        item: {label: 'View Saved Trips'},
        mapItemToNode: renderSavedTrips,
        mapItemToString: renderItem,
      },
    ],
  },
 
];

const LOGIN_NAV = [
  {
    icon: Icon,
    item: {label: 'Log In'},
    mapItemToNode: renderLogin,
    mapItemToString: renderItem,
  },
  {
    icon: Icon,
    item: {label: 'Sign Up'},
    mapItemToNode: renderSignUp,
    mapItemToString: renderItem,
  }
]


function isActive(arr, item, activeItem) {
  let active = false;
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      if (item === activeItem) return true;
      return isActive(
        (item && item.nav) || [],
        activeItem,
        activeItem,
      );
    } else if (elm.nav) {
      active = isActive(elm.nav || [], item, activeItem);
    }
  }
  return active;
}


export default ({loggedIn, logout, currentUser}) => {
  
  const [css] = useStyletron();
  const [activeNavItem, setActiveNavItem] = React.useState();
  const containerStyles = css({
    boxSizing: 'border-box',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
  }); 

  function logOut() {
    return <StyledLink
    onClick={logout}
     $style={{
       textDecoration: 'none',
       color: 'inherit',
       ':hover': {color: 'inherit'},
       ':visited': {color: 'inherit'},
     }}
     href={'/'}
   >
     Log Out
   </StyledLink>
   }

   const USER_NAV = [
    {
      icon: UserIcon,
      item: {label: 'Assess Trip'},
      mapItemToNode: renderCreateTrip,
      mapItemToString: renderItem,
    },
    {
      icon: UserIcon,
      item: {label: 'View Saved Trips'},
      mapItemToNode: renderSavedTrips,
      mapItemToString: renderItem,
    },
    {
      icon: UserIcon,
      item: {label: 'Logout'},
      mapItemToNode: logOut,
      mapItemToString: renderItem,
    }
  ];

  const userName = currentUser && currentUser.user && 
  `${currentUser.user.first_name} ${currentUser.user.last_name}`
  
  const nickName = currentUser && currentUser.user && 
  `${currentUser.user.nickname}`
  return (
    <React.Fragment>
        <Layer>
          <div className={containerStyles}>
            <AppNavBar
              appDisplayName={appDisplayName}
              mainNav={loggedIn ? MAIN_NAV : LOGIN_NAV}
              isNavItemActive={({item}) => {
                return (
                  item === activeNavItem ||
                  isActive(MAIN_NAV, item, activeNavItem)
                );
              }}
              onNavItemSelect={({item}) => {
                if(item === activeNavItem)
                return setActiveNavItem(null)
                setActiveNavItem(item);
              }}
              userNav={loggedIn && USER_NAV}
              username={userName}
              usernameSubtitle={nickName}
              userImgUrl=""
            />
          </div>
        </Layer>
    </React.Fragment>
  );
};