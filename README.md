# token-analytics

This project is about being able to extract APRs grouped by time from different pairs of crypos and display them on a dashboard.
All data is consumed from the Uniswap V2 graph.

The application has 2 parts, a web client made in React and an API made in Typescript with NestJS as framework.

Postgres was used as database.

To be able to use the application first of all we must have Postgres running on our computers. Then, in the API you must create an .env file with the following information:

POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

UNISWAP_URL=https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2

Once the file is created, the API can be raised using the "npm start" command (the API will be listening on port 3000) and the pair_hour_data entity will be automatically created in the database.

To be able to load information to the database, an http POST request must be made to the following path:

http://localhost:3000/uniswap/pair-hour-datas

and with the body:

{
    "pairId": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
}

where pairId is the pair we want to collect information. Nowadays only the last 48hs of information that the pair has is collected, in case there is no information in the last 48hs, nothing will be collected.

In order to use the dashboard, you must create an ".env" file with the following information:

REACT_APP_BASE_API_URL=http://localhost:3000

and then you must raise the client using the command "npm start" (the client will be raised on port 3001 and then you must go to the following URL:

http://localhost:3001/dashboard/pairs/0xbc9d21652cca70f54351e3fb982c6b5dbe992a22

where 0xbc9d21652cca70f54351e3fb982c6b5dbe992a22 is the pairId we want to plot in the chart.

At the moment the only real information in the dashboard is the one contained in the chart showing the APR per hours, and it can only be grouped according to 1hs, 6hs or 12hs.
