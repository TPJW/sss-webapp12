I want to build a "Sustainability Stratagy Selector" (SSS) webapp, to be used by landscape architects/civil engineers at an architecture firm to help illustrate different design decisions when it comes to a buildings site. The intended UI is that  the client navigates though the webapp, with our without a landscape architect present to guide them through.

The UI/UX should be comprised of frou main steps:
1. A welecome screen is displayed to welcome the client to the SSS for their project. It should have a description of the purpouse of the webapp, as well as information on their project & the landscape architect working on the project (with contact info). It will have a button to prompt the user to begin the selector, with a note on estimated time to complete (10 minutes)

2. The second part is the "meat and potatoes" in terms of user input. The SSS will go though several pages, each specific to one site system (soil, water, etc...) on each site system page, the user will be asked how they want to approach the item (i.e. "how do we want to approach water management?"). The page will then show several options, typically a baseline, enhanced, and high performance option. There should be an accompanying graphic & a very brief description (4 words). Below the options, an info section will display additional info on the option, in bullet point format (pros, cons, etc...). The user will only be able to choose one option, and the proceed to the next site system (or go back to the previous). 

3. The third part is the main user output - the Sustainability Balance overview. The overview will consist of a radar chart, and summary. The chart will display several sustainabilty design options (heat & shade comfort, stormwater rediability, etc..), where the selections from the previous chart will adjust the value each one is. The summary is a text parallel to the chart, overviewing what the design emphasizes and some bullet points.

4. The fourth part is to generate an output/snapshot. This can be an PDF report showing the client, project, architect, user selections (part 2), and overview (part 3). 

In terms of design/backend, the pages from part 2 should be dynamic, where they can call on a support file (json, use best judgement), where an landscape architect can add a new site system, options, modify the weight they apply on the radar chart options, etc...

Attached is a sample set of the radar chart options, and site systems. 

The UI should be modern & reactive. Navigation should be constant across the pages, with a progress tracker at the top (i.e. intro --> Site systems --> Review --> snapshot) that updates as you progress

The left margin should have a constant display of project info, client, and architect info.  @file:C:\Users\justin.wolters\Desktop\SSS Site Systems.json @file:C:\Users\justin.wolters\Desktop\SSS Sample Project Info.txt