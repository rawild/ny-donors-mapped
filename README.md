# Mapping NY State Political Donors

## Introduction
A [2014 study](https://scholar.princeton.edu/sites/default/files/mgilens/files/gilens_and_page_2014_-testing_theories_of_american_politics.doc.pdf) measured who influenced federal policy from 1989 to 2002. The different groups measured were average citizens, economic elites, mass-based interest groups (including everything from unions to the National Rifle Association), and business interest groups. The study found that average citizens have "essentially zero" impact on policy changes at the national level. Economic elites had by far the most influence, followed by business interest groups, which had 55% of the influence of economic elites. Mass-based groups had about half of the influence of business groups and about 30% of the influence of economic elites. 

My research question is who are these “economic elites” in New York state? Can we map them based upon the census data available about median income? What proportion of New York State political donations come from census tracts that have high incomes? What are the major donors of different regions within the state and who do they donate to? 


## Data and Methods

I built a database of cleaned New York state political donors for my capstone for this degree. The github is here: [ny-campaign-finance-dedupe](https://github.com/rawild/ny-campaign-finance-dedupe) and the full process is described in [this white paper](https://academicworks.cuny.edu/cgi/viewcontent.cgi?article=5299&context=gc_etds). It is the primary source of data for this project. 

The original source of the data is the New York State Board of Elections. It includes political contributions to committees and candidates for state and local offices, however there is a delay in reporting for the local races. The data I have was accessed from the New York State Board of Elections on March 15, 2021, but it contains little of the donations for the 2021 New York City elections for city council, mayor, etc. 

There are two kinds of donors in the filings: organizational, and individual. For this project, I focused on individual donors who donated from January 1, 2016 until March 15, 2021. The total number of individual donors is 639,722 who had donated $402,543,936 in contributions.

The census data I used for median household income was variable B19013_001E from table B19013 (Estimate Median household income in the past 12 months in 2019 inflation-adjusted dollars) from the 2019 American Community Survey with five year rolling estimates. I used the version summarized by census tract for all of the census tracts in New York State. I extracted it from the US Census Bureau’s API via the censusdata python library. The spatial data files for New York State 2010 census tracts I downloaded from the US Census Bureau’s website directly. I also used the US Census Bureau’s 500k 2018 state map for the state map analysis.

The world geometric file that I used was from the IPUMS International library of GIS boundary files, their 2020 world map release in WGS84. 

In order to do spatial analysis on the donor data, I needed to geocode the addresses from the board of elections records to resolve to latitude and longitude. To do this I wrote a script in python to query the US Census Bureau’s Geocoder API. This API is very slow at returning results and so I had to divide up the donor list into chunks of 100,000 and run six processes simultaneously to get the results in a reasonable amount of time. 

After using the US Census Geocoder there were still 95,630 donors that either had badly formed addresses, addresses the US Census Geocoder couldn’t parse, or addresses outside of the United States. For those remaining donors I used the HERE Geocoding & Search API. This API was able to resolve all but 2,137 of the donors’ addresses.

The US Census Geocoder returns the geographic points using the NAD83 coordinate system, while the HERE Geocoding API returns them in WGS84. I used QGIS to reproject the WGS84 coordinates to NAD83 before joining the two files. 

Once I had all the donors geocoded, I used QGIS to map them on the world map and count them in the country polygons. I did this twice, once to count the number of donors in each country, and once weighted with the donor's donations, which essentially sums up the total donated from people in each country. 

The donor data I created via my geocoding process did not have a spatial index so I used QGIS to create one to speed up the joins.

I did the joins again with the US state map and then again with the New York census tracts map.

I also used QGIS to do a join by location to connect the US census tract information back to the individual donors. I uploaded the census tract information into my sql database of donors. This allowed me to do queries on the contributions filtered by the income level of where they were from. Because the contributions are also linked to recipients it was possible also to analyze what candidates or committees are getting their donations from what income brackets.

## Results [(see the interactive)](https://rawild.github.io/ny-donors-mapped/)

Globally, I found that the majority of donations come from the US, but there are a handful of US citizens abroad who donate back to New York. These donations do not represent substantial amounts of money, but they come from anglophone countries like Australia, the UK, and Canada.

Within the United States, I found that 16% of the donations come from states and territories outside of New York. New Jersey and Connecticut top the list, as adjacent states with populations closely linked to New York City. Other populous states like California and Florida are at the top of the list. The outlier state is Arkansas, from which there were $7.3 million from just 239 donors. I reviewed the donor data and confirmed that 99.6% of the donation money was from members of the Walton family which are the heirs to the Walmart Corporation.

Within New York I found that the majority of donations (54%) came from areas that were in the top 20% of income. The top 40% of census tracts for median income are responsible for 72% of donations. By mapping out the districts and comparing their median income to the amount of donations, I revealed some of the weaknesses of using median income as a stand-in for the wealth of individuals.

Median income is does not capture wealthy people who live or work in areas that do not have many other wealthy people living in them. For this reason the census district in downtown Albany which has a median income of $19,776, but is also home to many lobbying offices, gave $905,552 in donations. Similarly Wellsville on the New York – Pennsylvania border has a median income for $45,133, yet there were $1,302,770 donated from there, mostly by one person: oil baron Charles Joyce. 

I analyzed how much some of the biggest recipients got from the different income levels. In the last 5 years alone Andrew Cuomo got $11 million from the donors in the wealthiest areas. That’s more than any other recipient got in total. Looking at the biggest recipients in whole, they almost all received more than 54% of their donations from the most wealthy New Yorkers.

A further flaw in my analysis is revealed by the New Yorkers for a Balanced Albany PAC, which is shown in my visualization to have significant support from low-income areas. This PAC is in fact funded entirely by 45 donations only, all from billionaires like Daniel Loeb and the Waltons.  It was formed to counteract the push to oust the IDC in Albany. The IDC was a small group of Democrats who gave the Republicans control of the New York State Senate. 

Some of the billionaires bank-rolling New Yorkers for a Balanced Albany like Roger Hertog, live very close to central park, too close in fact, for my geocoding, which put the latitude and longitudinal coordinates inside the census tract that is central park. According to the census, the census tract that is central park as a median income of $0, thus making it seem like the New Yorkers for a Balanced Albany PAC gets $3 million from the lowest income areas.

I finished my analysis with an interactive map that allows users to look at the top 100 census tracts that contributed the most amount of money in donations.


## Conclusion
Logically, rich people donate more money to politicians because they have more money. What this analysis tries to do is quantify the extent to which that is the case in New York. Despite the flaws in the analysis it is very clear that most of the money funding our politicians comes from wealthy New Yorkers.  It also demonstrates that they spend more on the biggest recipients of donations than they do on smaller recipients, concentrating on trying to influence powerful actors.

By looking at the donor’s donations across all recipients it is clear that while some of these wealthy people are partisan, many donate to individuals and groups that they think have power and will represent their interests in Albany and City Hall. The Waltons and their ilk give a lot of money to Cuomo. They also spent millions trying to prevent the Democrats from taking back control of the New York State Senate.  

What does this say about our democratic system that is supposed to represent each person equally? Given the widespread and unmatched influence of wealthy people, their interests in policies that allow them to grow and maintain their wealth dominate the political options available to New Yorkers. 


## [Have fun exploring!](https://rawild.github.io/ny-donors-mapped/)
