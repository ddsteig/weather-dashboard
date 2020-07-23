Basic Page Layout:

Row = Header

Row:

Column = Search for city:
        *I have a input field, and an icon.
        *When I search for cities, recent cities are listed.
            *Use of local storage.
                Function to set local storage.
                Function to get local storage & display.
                    List of Recently searched cities.

    Row = City: Temp,  Humid, Wind Spd, UV Index: Colored according to index.
        *Information is retrieved from api.
            Function to retrieve api data.
            *Information is displayed.
            Function to display data.
                Function / conditional for uv index.
                *Last city displayed set to local storage.

    Row = 5 Day Forecast.
        *Cards with data attribute to display 5-day forecast.
        Function for displaying forecast.
        
Api Data:
    Function to set data.
    Function to get data.
        Display data.