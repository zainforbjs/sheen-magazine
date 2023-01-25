# Componennt Descriptions

## Table of content

- [Navigation](#navigation)
- [Header](#header)
- [Layout](#layout)
- [ScrollBar](#scrollbar)
- [Button](#button)
- [Image](#image)
- [Loading](#loading)
- [Form Control](#form-control)
- [Subscription](#subscription)

## Navigation
- Stack: This is the display all the stack navigation for each features. This takes in an array of routes and components to distributes to each screens.
- Drawer: This includes tab and slide navigators. The tab navigators enable to view feature and its child routes, and the slide navigation bar is to handle authentication or allow to control settings.

## Header

- This is the component to handle the header of the whole application. This components has default to have the logo display. To hide the logo, set the logo props to false. It has header left and header right props to put components in the left and the right side of the logo.
- prevent layout from overlapping with status bar, and to adapt modern style of notched screen devices.
- status bar is the section located at the top of the screen that displays the current time, network information, battery level or other status icons.

## Layout

- Grid: Use for galary and grid layout of the app. This component takes an array of ReactNode to process with the chunk size to know how many item in 1 row.
- PopupOverlay: display popup screen like a modal in the app. This is used for Home screen and the Issue screen popup to navigate to subscription. 
- Screen: The screen to display the tab navigation between each screen in a feature or doing the filter. It displays a group of button with options in the top of the page
- ScrollView: show the screen with the ScrollView for all screens with ScrollViews in the app. 
- MiddleAlignScreen: This is to make sure to put the content align in the center of the screen with the width of around 90% of the screen.

## ScrollBar

For any group of buttons that is more than 4 items, the screen will break so this is a way to make sure we have a scrolling on the top for the button to be scrolled horizontally. It calculates the screen width and height and do the splitting.

## Button

- Eclipse: Common button in most the issue screen and the tab navigation or filter in the LayoutScreen.
- IconCircleIonicons: Circle button with only an icon in it.
- IconFeather: Mainly for the icons in the header.
- Round: Round button with text

## Image

- Viewer: to view the image and put a white border around it. Support zoom in and out for seeing better image.
- WithScreen: get the actual size of the image to make the aspect ratio of the image so it can display with correct way on the page. Take default calculation to use the modifier and the screen width and height to display image if unable to get the actual image size.

## Loading

This component represents loading state while waiting for an API call

## Form Control

- FormControlText: This components is the TextInput component for a form for the app. It has the error spot to show the errors
- ErrorMessage: show the error for the form field based on the error object

## Subscription

- Subscription: Subscribe screens for the Issue subscription and the Tv subscription screens. The component handle the buying and extending subscription for both. 
- SubscriptionPopup: Screen for the presubscription navigation from Home. This component is used for both issue and videos screens. 
