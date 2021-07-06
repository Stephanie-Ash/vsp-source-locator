# VSP Source Locator

This website calculates the location of a single or series of VSP sources in relation to the wellhead. A VSP (Vertical Seismic Profile) survey is a type of seismic survey used by the oil industry. It is recorded by placing a series of receivers in an oil well and then setting off a sound source at a certain distance away from the well. The receivers record the sound waves and these data are then processed to generate a picture of the subsurface. It is essential to know the location of the source in relation to the well in order to process the VSP data. However the source location information is not always provided in the same format. Sometimes it is provided as X and Y UTM coordinates, other times as X and Y offsets from wellhead (the surface location of the well) or alternatively as an offset and azimth from wellhead. There is often a requirement for the data processor or field engineer (who records the survey) to convert the source location information from one format to another. It is not uncommon for mistakes in the conversion to be made particularly in the reports generated when the data are recorded as there tend to be certain time constraints. This site removes the human error by converting the source location from one format to another. It is targeted towards oil industry professionals involved in the planning, recording and processing of VSP data. It will be useful for quickly calculating source locations or as a check for reported locations.

[The live project can be found here.](https://stephanie-ash.github.io/vsp-source-locator/)

![Responsive Site](assets/screenshots/vsp-source-locator-responsive.jpg)

## User Stories

  1. As someone planning a multi source VSP survey I want to calculate the planned source locations in various formats ready to provide to the field engineer. I want to make a visual check of the planned locations to see if they are where I expect in relation to the wellhead.
  2. As a field engineer I want to convert the source UTM coordinates recorded with the data into more useful offset and azimuth values for the report I am generating. I want to check that the resulting locations are where I expect.
  3. As a VSP data processor I want to convert the source location information provided with the recorded data into the format required by my processing software.