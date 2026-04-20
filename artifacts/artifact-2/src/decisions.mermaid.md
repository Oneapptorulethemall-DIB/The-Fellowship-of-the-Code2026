%% ENTRY POINT
    A([User opens Route Comparison screen])
    A --> B{"Are there at least 2 routes<br>in the Knowledge Registry?"}

    %% EMPTY STATE PATH
    B -- "No" --> C[System shows empty state:<br>No routes to compare yet]
    C --> D([User navigates to<br>Knowledge Registry to add routes])
    D --> B

    %% MAIN COMPARISON FLOW
    B -- "Yes" --> E[System displays comparison screen:<br>routes, criteria, and ranking summary]
    E --> F([User reviews comparison<br>across shown routes])

    %% USER DECISION BRANCH
    subgraph INTERACTION_LOOP ["Iterative user exploration"]
      direction TB
      F --> H{"What does the user do next?"}

      %% Adjust weights path
      H -- "Adjusts weights" --> I([User taps a weight chip])
      I --> J["Ranking updates visually<br>(animation or highlight change)"]
      J --> F

      %% Route detail path
      H -- "Views route detail" --> K([User taps a route tab])
      K --> L["Route detail sheet opens:<br>attributes, sources, timestamps"]
      L --> F

      %% Gap details path
      H -- "Views gaps" --> M([User taps info gap banner])
      M --> N["Bottom sheet shows:<br>gap description, missing source,<br>confidence level"]
      N --> F
    end

    %% Selection phase
    F --> O([User taps <b>Select route</b>])
    O --> P["System shows ranked list<br>for confirmation"]
    P --> Q([User selects one route])
    Q --> R["Confirmation screen:<br>shows ranking, notes, open gaps"]
    R --> S{"Confirm selection?"}

    S -- "No" --> F
    S -- "Yes" --> T["System confirms selection<br>and logs decision visibly"]

    %% Fallback choice
    T --> U{"Add fallback route?"}
    U -- "Skip" --> V["System saves and returns<br>to overview screen"]
    U -- "Yes" --> X([User picks fallback route<br>and sets trigger condition])
    X --> Y["System links fallback<br>and confirms configuration"]
    Y --> V

    %% START & END MARKERS
    A@{ shape: tri}
    V@{ shape: tri}

    %% COLOR CLASSES
    classDef userAction stroke:#2dd4bf,fill:#f0fdfa;
    classDef systemResponse stroke:#818cf8,fill:#eef2ff;
    classDef decision stroke:#fb923c,fill:#fff7ed;
    classDef subflow stroke:#a78bfa,fill:#f5f3ff;

    class A,D,F,H,I,K,M,O,Q,S,U,X userAction;
    class B,C,E,J,L,N,P,R,T,V,Y systemResponse;
    class H,S,U decision;
    class INTERACTION_LOOP subflow;
