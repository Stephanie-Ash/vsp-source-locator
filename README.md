# VSP Source Locator

This website calculates the location of a single or series of VSP sources in relation to the wellhead. A VSP (Vertical Seismic Profile) survey is a type of seismic survey used by the oil industry. It is recorded by placing a series of receivers in an oil well and then setting off a sound source at a certain distance away from the well. The receivers record the sound waves and these data are then processed to generate a picture of the subsurface. It is essential to know the location of the source in relation to the well in order to process the VSP data. However the source location information is not always provided in the same format. Sometimes it is provided as X and Y UTM coordinates, other times as X and Y offsets from wellhead (the surface location of the well) or alternatively as an offset and azimth from wellhead. There is often a requirement for the data processor or field engineer (who records the survey) to convert the source location information from one format to another. It is not uncommon for mistakes in the conversion to be made particularly in the reports generated when the data are recorded as there tend to be certain time constraints. This site removes the human error by converting the source location from one format to another. It is targeted towards oil industry professionals involved in the planning, recording and processing of VSP data. It will be useful for quickly calculating source locations or as a check for reported locations.

[The live project can be found here.](https://stephanie-ash.github.io/vsp-source-locator/)

![Responsive Site](assets/screenshots/vsp-source-locator-responsive.jpg)

## User Stories

  1. As someone planning a multi source VSP survey I want to calculate the planned source locations in various formats ready to provide to the field engineer. I want to make a visual check of the planned locations to see if they are where I expect in relation to the wellhead.
  2. As a field engineer I want to convert the source UTM coordinates recorded in the field into more useful offset and azimuth values for the report I am generating. I want to check that the resulting locations are where I expect.
  3. As a VSP data processor I want to convert the source location information provided in the field report into the format required by my processing software.

## Features

### Existing Features

* **Logo, Background Image and Title**
    * The logo of a simple rig with crane source alerts the user that the site is related to the oil industry and perhaps also VSP.
    * The background image of an oil rig is also instantly recognisable to oil industry professionals, even when cropped, and alerts them straight away that the site is designed for them.
    * The site title describes the purpose of the site and again alerts the user to the fact it is for VSP based professionals.

![Logo Background and Title](assets/screenshots/vsp-source-locator_logo-and-background.jpg)

* **Instruction Area**
    * The instruction area explains to the user in more detail the purpose of the site.
    * It also allows the user to understand how the locator should be used.

![Instruction Area](assets/screenshots/vsp-source-locator_instruction-area.jpg)

* **Input Area**
    * The input area provides the user with boxes to input all the parameters needed to run the calculations.
    * The area is simply laid out with different types of inputs grouped together so that they are easily differentiated between. 
    * Alerts have been coded into the JavaScript file to alert the user to missing or incorrect inputs thus providing extra guidance on how to use the site.
    * The calculate button has been given a dark background to provide contrast with the calculator area background and catch the users eye.

![Input Area](assets/screenshots/vsp-source-locator_input-area.jpg)
![Alert](assets/screenshots/vsp-source-locator_alert.jpg)

* **Result Area**
    * The result area displays above the input area when the calculation is run, generally ensuring that the user does not have to scroll to find the results.
    * It provides the source location in both formats (both input values and calculated results) ensuring that the user has all the information they need.
    * The Create Plan button displays just below the results ensuring it is quick and easy to generate a plan to check the results.
    * The source location input boxes are cleared after the calculation is run making it easy for the user to input further values. 

![Route of the Month](assets/screenshots/vsp-source-locator_result-area.jpg)

* **Add Source Button and Source List**
    * The add source button allows the user to calculate a list of sources related to the same well. This is useful to the user as it is common to record a series of VSP surveys at the same well with the source increasing in offset.
    * The Input Wellhead Location boxes remain populated after the initial calculation so that the user does not have to input this information every time they add an additional source. These values select on focus to save the user time if new locations are required.
    * An alert message will pop up if the user attempts to use the Add Source option after changing the Wellhead coordinates.

![Source List](assets/screenshots/vsp-source-locator_source-list.jpg)

* **Plan Area**
    * The Create Plan button generates a Google Charts scatter chart which acts as a plan view of the wellhead and source locations.
    * This allows the user to make a quick visual check of the source locations to ensure that they are (for example) displaying on the expected side of the well.
    * The locations of the points are displayed on mouse hover making it easy to compare the source locations on the plan with those listed.

![Plan Area](assets/screenshots/vsp-source-locator_plan-area.jpg)

### Features Left to Implement

* **Tooltips**
    * Tooltips on mouse hover over the input boxes or buttons could provide further assistance to the user when using the site.
* **More Interactive Plan View**
    * A more interactive plan view would give the user the option to select the display parameters and set the maximum and minimum scale values to whatever they choose.

### Wireframes

* Desktop view wireframe [View](assets/wireframes/vsp-source-locator_desktop.jpg)

* Mobile view wireframe [View](assets/wireframes/vsp-source-locator_mobile.jpg)

## Testing

### Tested User Stories

  1. As someone planning a multi source VSP survey I want to calculate the planned source locations in various formats ready to provide to the field engineer. I want to make a visual check of the planned locations to see if they are where I expect in relation to the wellhead.
      * Upon entering the site the instruction area details the different source inputs that can be added and describes the add source option that can generate a list of more than one location.
      * The Add Source option provides the user the option to calculate the location of all their planned sources.
      * The list shows both the source X and Y and offset and azimuth making it easy for the user to get all the information they require for the field engineer.
      * The create plan option provides the user a quick visual check so that they can be certain the sources are where they are expecting.
  2. As a field engineer I want to convert the source UTM coordinates recorded with in the field into more useful offset and azimuth values for the report I am generating. I want to check that the resulting locations are where I expect.
      * The site offers a quick way to convert from source UTMs to offsets and azimuths.
      * The site allows the user to be confident that the information they add to their report is correct.
      * The create plan option again provides a visual check which the user can compare to their map of the well area.
  3. As a VSP data processor I want to convert the source location information provided in the field reportinto the format required by my processing software.
      * The UTM and offset and azimuth source location inputs allow the user calculate the values required however the information is provided in the field report.
      * The instruction area details an additional way of using the site if the source locations are provided as X and Y offsets from wellhead.

### Validator Testing

* HTML
    * No errors have been found when passing through the [W3C validator](https://validator.w3.org/).
* CSS
    * No errors have been found when passing through the [Jigsaw validator](https://jigsaw.w3.org/css-validator/).
* JS
    * [JSHint](https://jshint.com/) was used to validate the JS. Missing semicolons were identified and added to the code. No other major issues have been identified.

### Further Testing

* Continuous testing was carried out throughout the development process with display errors corrected as they appeared. The functionality was also tested throughout.
    * The initial checks in the checkValues function to ensure that input values had been provided had initially not taken into account the fact that zero values would be considered falsy and further conditions were added.
    * A check to see if the input source and wellhead locations were identical (meaning no calculation was required) was originally added to the calculation functions. However, although the warning alert worked correctly, the calculations were still carried out and undefined values were displayed. This check was moved to the checkValues function.
    * The event listener for the Add Source button was initially activated after the first calculation was carried out. However this resulted in the event listener running twice if both the Calculate and Add Source options were run again leading to an alert notifying of missing input values. It was decided that all event listeners should instead be added when the DOM content loaded and a variable created to define which button had been clicked which would be used to select the correct display function.
* It is not possible to test every possible input value as the range of acceptable values is so wide (including 6-7 figure UTM coordinates or 2 figure offsets).
    * A variety of input values have been tested spanning all quadrants of the circle. These checks have included values that you would not normally expect from a VSP survey and values from real VSP jobs. Checks and solutions have been added for North, South, East or West locations which may result in division by zero.
    * A fellow VSP processor was asked to test values from various VSP jobs they had processed.
    *  It is possible that the calculation will not work correctly for every value but problem values should generally be ones that would not be seen in a VSP survey.
* The site was tested on various screen sizes using the Chrome Developer tools and media queries added.
    * The largest likely calculated values have been considered when setting these display parameters.
* Friends and family members were asked to review the site on various mobile devices to determine if the site was suitably responsive.

### Unfixed Bugs

* The buttons do not display as expected on Apple devices.

## Deployment

### GitHub Pages

The project was deployed to GitHub Pages. The following steps are used to deploy the site:
* Navigate to GitHub and locate and select the GitHub repository.
* Navigate to the settings tab and select the 'Pages' tab from the menu.
* Under 'Source' click the dropdown labelled 'None' and select the 'master' branch.
* Click save. The page will automatically refresh and the published site link can be found on the 'Pages' tab.
* The link can be found here - https://stephanie-ash.github.io/vsp-source-locator/

### Forking the GitHub Repository

The following steps can be used to fork the GitHub repository:
* On GitHub navigate to the main page of the repository.
* The 'Fork' button can be found on the top righthand side of the screen.
* Click the button to create a copy of the original repository.

### Cloning the GitHub Repository

The following steps can be used to clone the GitHub repository:
* On GitHub navigate to the main page of the repository.
* Above the list of files select 'Code'.
* Three options are provided, HTTPS, SSH and GitHub CLI. Select the appropriate option and click the 'Copy' button next to the URL.
* Open Git Bash.
* Change the working directory to the location for the cloned directory.
* Type git clone and paste the copied URL.
* Press 'Enter' to create the clone.

## Credits

### Content
* The 'Inter' font was taken from [Google Fonts](https://fonts.google.com/).
* The plan view was generated using [Google Charts](https://developers.google.com/chart).
* The background image was compressed to improve the speed of the website using [TinyPNG](https://tinypng.com/).
* Instructions on how to set the decimal places of the calculated and displayed figures were taken from [here](https://stackoverflow.com/questions/45381590/js-limit-the-number-of-decimal-places-in-a-number).
* Instructions on how to auto-highlight the wellhead input fields were taken from [here](https://stackoverflow.com/questions/6847875/auto-highlight-an-input-field-on-focus/6847937).

### Media
* The background image was taken by David Mark and found on [Pixabay](https://pixabay.com/).
* The rig logo was created by myself.

### Other
* The wireframes for the project were created using [Balsamiq](https://balsamiq.com/wireframes/desktop/).
* The mockup of the website in the README.md was created using [Am I Responsive](http://ami.responsivedesign.is/).