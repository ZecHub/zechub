
(function () {
  const ANALYTICS_STATE = {
    type: "users",
    range: "7d"
  };
  let USERS = [];

  const GrowthOppSVG = `
    <svg

      width="513.68683"
      height="491.95261"
      version="1.1"
      id="svg75"
      sodipodi:docname="rocket-312767.svg"
      viewBox="0 0 513.68683 491.95261"
      inkscape:version="0.92pre1_64bit r15016">
      <defs
        id="defs79" />
      <sodipodi:namedview
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1"
        objecttolerance="10"
        gridtolerance="10"
        guidetolerance="10"
        inkscape:pageopacity="0"
        inkscape:pageshadow="2"
        inkscape:window-width="1366"
        inkscape:window-height="745"
        id="namedview77"
        showgrid="false"
        fit-margin-top="10"
        fit-margin-left="10"
        fit-margin-right="10"
        fit-margin-bottom="10"
        inkscape:zoom="1.91875"
        inkscape:cx="380.89306"
        inkscape:cy="291.55133"
        inkscape:window-x="-8"
        inkscape:window-y="-8"
        inkscape:window-maximized="1"
        inkscape:current-layer="svg75" />
      <metadata
        id="metadata1906">image/svg+xml<rdf:RDF>
      <cc:Work
        rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
          rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
        <cc:license
          rdf:resource="http://creativecommons.org/publicdomain/zero/1.0/" />
      </cc:Work>
      <cc:License
        rdf:about="http://creativecommons.org/publicdomain/zero/1.0/">
        <cc:permits
          rdf:resource="http://creativecommons.org/ns#Reproduction" />
        <cc:permits
          rdf:resource="http://creativecommons.org/ns#Distribution" />
        <cc:permits
          rdf:resource="http://creativecommons.org/ns#DerivativeWorks" />
      </cc:License>
    </rdf:RDF>
    </metadata>
      <g
        transform="matrix(-0.26597355,-0.26597355,0.63371805,-0.63371805,38.735973,548.75353)"
        id="svg_29">
        <metadata
          id="svg_28">image/svg+xml</metadata>
        <path
          style="fill:#e73900;fill-rule:evenodd;stroke-width:1.00000039pt"
          inkscape:connector-curvature="0"
          d="M 58.95454,347.23395 C -9.037541,242.85088 73.060089,233.52847 52.118831,90.624024 103.47625,158.04097 117.81456,240.7354 139.37527,265.19403 c 14.88034,19.20859 22.2192,42.3949 20.21849,66.21726 -0.20173,18.85366 23.6251,41.6983 17.10981,59.3005 -34.64389,-27.74878 -94.232524,-9.66226 -117.74903,-43.47784 z"
          id="svg_27" />
        <path
          style="fill:#e73900;fill-rule:evenodd;stroke-width:1.00000021pt"
          inkscape:connector-curvature="0"
          d="m 161.7809,377.71368 c 0.39303,-19.99023 -23.79616,-28.66238 -33.52622,-44.27447 -16.1147,-11.92496 -21.21929,-30.48685 -21.57498,-48.76584 -1.3098,-29.23367 24.74826,-203.54258 62.71112,-250.35614 -14.5484,71.88596 21.56903,167.64252 43.88286,199.32079 15.09956,24.61357 20.77625,52.95274 15.3373,80.83769 -2.67223,22.24722 -21.10112,35.61532 -31.07051,55.56906 -9.97252,12.01678 -23.5441,13.15533 -35.75957,7.66891 z"
          id="svg_26" />
        <path
          style="fill:#e73900;fill-rule:evenodd;stroke-width:1.00000021pt"
          inkscape:connector-curvature="0"
          d="m 175.5607,387.49258 c 5.78662,-17.36703 -5.66486,-44.89495 -9.27092,-61.00222 -9.78333,-14.50379 -8.83797,-32.01615 -4.1256,-48.07773 6.93673,-25.87512 8.08193,-147.98087 120.02512,-205.321894 -86.81754,85.182644 -29.17041,154.410894 -19.77231,187.745504 5.49048,25.33325 2.68381,51.73715 -9.69748,74.51981 -17.09363,31.45379 -62.73308,48.78924 -77.15881,52.13653 z"
          id="svg_25" />
        <path
          style="fill:#e78c00;fill-rule:evenodd;stroke-width:1.00000003pt"
          inkscape:connector-curvature="0"
          d="m 157.11595,377.31308 c 0.29729,-16.31976 -17.99898,-23.39954 -25.35861,-36.14505 -12.18886,-9.73538 -16.04987,-24.88901 -16.31891,-39.81174 -0.99071,-23.86596 23.32575,-150.04612 42.82692,-204.387219 -13.30745,123.179279 20.92102,136.860989 37.79878,162.722669 11.42102,20.09418 15.71477,43.22989 11.60085,65.99475 -2.02123,18.16233 -10.73396,34.71701 -18.27463,51.00696 -7.54301,9.81034 -23.03485,5.09867 -32.2744,0.61963 z"
          id="svg_24" />
        <path
          style="fill:#e78c00;fill-rule:evenodd;stroke-width:1.00000039pt"
          inkscape:connector-curvature="0"
          d="m 86.962914,353.92651 c -69.840643,-71.70462 6.256737,-76.69827 -13.112495,-175.17469 23.002991,46.41659 42.077881,81.28575 50.453851,114.24382 12.39538,11.63806 55.22529,82.68295 52.65835,95.56353 -26.99225,-15.36667 -69.8897,-13.98593 -89.999706,-34.63266 z"
          id="svg_23" />
        <path
          style="fill:#e7e100;fill-rule:evenodd;stroke-width:1.00000039pt"
          inkscape:connector-curvature="0"
          d="M 100.90993,349.60901 C 59.13153,309.94962 90.33152,286.66406 89.958259,237.12917 c 11.549271,43.35273 48.079751,54.03501 47.610721,80.07765 6.03492,7.79028 37.63431,63.34457 34.99195,70.48333 -14.05024,-11.25384 -55.82177,-23.05477 -71.651,-38.08114 z"
          id="svg_22" />
        <path
          style="fill:#e78c00;fill-rule:evenodd;stroke-width:1.00000021pt"
          inkscape:connector-curvature="0"
          d="m 168.06467,344.26385 c -7.3404,-10.88214 -6.63111,-24.0216 -3.09543,-36.07254 5.2046,-19.414 28.07133,-127.32403 60.7381,-150.79486 -23.59104,44.36028 7.42985,112.59653 14.4812,137.60736 4.11949,19.00745 5.27165,41.48987 -7.27597,55.91193 -18.95542,21.78708 -42.88182,34.47507 -56.29,37.51706 -8.52365,5.98154 -5.85229,-32.08371 -8.5579,-44.16895 z"
          id="svg_21" />
        <path
          style="fill:#e7e100;fill-rule:evenodd;stroke-width:0.99999985pt"
          inkscape:connector-curvature="0"
          d="m 156.26263,378.50754 c 0.58986,-9.98438 -10.43516,-14.77625 -14.6226,-22.76364 -7.21938,-6.26514 -9.20458,-15.6395 -8.99637,-24.78269 -0.0101,-14.63678 -0.50958,-105.87648 18.02599,-128.55794 -8.20394,35.6561 22.69143,88.80791 32.37858,105.06359 6.49039,12.58816 8.54106,26.86035 5.4534,40.6954 -1.69139,11.06943 -7.43953,20.98737 -12.46341,30.77249 -4.86341,5.8179 -14.23059,2.54602 -19.77558,-0.42721 z"
          id="svg_20" />
        <path
          style="fill:#e7e100;fill-rule:evenodd;stroke-width:0.99999985pt"
          inkscape:connector-curvature="0"
          d="m 165.07971,379.78284 c 4.74578,-6.95044 -1.13754,-15.17905 -0.70358,-22.75531 -2.49935,-7.64521 0.12405,-15.26957 4.23044,-21.77805 6.32576,-10.56763 17.44223,-89.10139 40.63311,-97.45039 -21.34854,22.18303 15.72362,81.49476 15.68122,97.41783 -0.76264,11.89306 -15.23012,27.96655 -23.44464,36.61523 -6.01024,7.2569 -17.9049,14.23078 -25.76445,19.11887 -6.02721,-3.66385 -7.91678,-6.6232 -10.6321,-11.16818 z"
          id="svg_19" />
        <path
          style="fill:#ffff9e;fill-rule:evenodd;stroke-width:1.0000011pt"
          inkscape:connector-curvature="0"
          d="m 157.0795,371.83478 c -14.75608,-23.24143 -9.28153,-49.17026 -3.00633,-77.45117 2.85862,19.18917 14.76661,42.47567 21.49823,50.11206 4.64589,5.99725 6.93719,13.23639 6.31254,20.67413 -0.063,5.88641 -3.05125,13.01889 -5.08543,18.51459 -10.81639,-8.66364 -12.37677,-1.29184 -19.71901,-11.84961 z"
          id="svg_18" />
        <path
          style="fill:#ffff9e;fill-rule:evenodd;stroke-width:1.0000011pt"
          inkscape:connector-curvature="0"
          d="m 173.66742,360.30753 c 11.43123,-25.04462 0.11491,-44.76145 26.31412,-64.40897 -7.82358,18.21469 10.06971,46.97555 8.12272,56.94846 -3.27428,16.7716 -25.88508,29.25442 -31.60083,30.54705 1.36171,-13.79126 -7.68024,-11.17401 -2.83601,-23.08654 z"
          id="svg_17" />
        <path
          style="fill:#ffff9e;fill-rule:evenodd;stroke-width:1.0000011pt"
          inkscape:connector-curvature="0"
          d=""
          id="svg_16" />
      </g>
      <g
        transform="matrix(1.4938907,1.5212294,-1.5212294,1.4938907,-120.80487,-819.40453)"
        id="svg_1">
        <path
          style="fill:#ececec;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          id="path3217"
          d="m 481.66812,67.248428 c -8.02402,6.942398 -69.69934,65.128842 -22.98169,176.556102 h 46.54151 0.17102 C 552.11639,132.37779 490.4415,74.199982 482.4173,67.257279 l -0.74918,-0.0088 z" />
        <path
          style="fill:#cccccc;fill-rule:nonzero;stroke-width:3;stroke-linecap:round;stroke-miterlimit:4"
          inkscape:connector-curvature="0"
          stroke-miterlimit="4"
          d="m 483.60232,139.38954 c -9.71862,0 -17.62307,8.60173 -17.62307,19.1668 0,10.56509 7.90445,19.15799 17.62307,19.15799 9.71866,0 17.6312,-8.5929 17.6312,-19.15799 0,-10.56507 -7.91254,-19.1668 -17.6312,-19.1668 z m 0,2.26637 c 8.59061,0 15.54639,7.5616 15.54639,16.90043 0,9.33883 -6.95578,16.8916 -15.54639,16.8916 -8.59063,0 -15.53829,-7.55277 -15.53829,-16.8916 3e-5,-9.33883 6.94766,-16.90043 15.53829,-16.90043 z"
          id="path3219" />
        <path
          style="fill:#ff0000;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 450.56461,112.99554 11.31958,-22.607677 15.79473,-19.459793 4.47516,-3.720245 16.84775,19.173599 13.16223,23.180036 1.05304,4.86496 -62.91574,-0.28618"
          id="path2419" />
        <path
          style="fill:#ff0000;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 444.24673,199.1337 c 0,0 -27.90408,-0.37778 -11.05633,76.69446 0,0 1.57947,-64.35379 16.32123,-56.41986"
          id="path2408" />
        <path
          style="fill:#ff0000;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          id="path2410"
          d="m 519.91931,199.1337 c 0,0 27.90393,-0.37778 11.05628,76.69446 0,0 -1.57947,-64.35379 -16.32123,-56.41986" />
        <path
          style="fill:#b3b3b3;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 451.88086,228.03723 6.84439,15.73953 46.85773,-0.28619 5.5281,-15.45334 z"
          id="path2423" />
        <path
          style="fill:#d20000;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 526.37933,206.86041 -5.26489,14.30869 -3.15894,-2.86179 -3.68548,1.71704 5.00171,-21.46298 8.95037,4.86496 c 0,0 15.53144,11.73312 3.42218,70.11252 7.10761,-60.3826 -5.52819,-66.67844 -5.26495,-66.67844 z"
          id="path3209" />
        <path
          style="fill:#d20000;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 432.40066,274.96967 c 0,0 -2.62188,-62.42981 15.26826,-62.67194 1.97418,-0.0267 1.84271,6.86813 1.84271,6.86813 l -7.10764,1.71704 -5.52814,18.88746 z"
          id="path3213" />
        <path
          style="fill:#999999;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 493.94302,228.03854 c 1.05622,3.45911 1.68036,8.2858 1.37632,15.16526 0.2247,0.0861 0.4627,0.20685 0.70849,0.34527 l 9.55264,-0.062 4.45456,-12.44739 c -0.17968,-1.0635 -0.38726,-2.01275 -0.5863,-3.00116 z"
          id="path3232" />
        <path
          style="fill:#cccccc;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 488.18735,196.77953 c -1.77692,-0.1431 -2.89917,0.15936 -2.89917,0.15936 l -1.31931,22.03522 c 0,0 6.3418,-1.36139 9.33274,8.02081 h 15.53827 c -5.04676,-25.58417 -15.54917,-29.80447 -20.65253,-30.21539 z"
          id="path3227" />
        <path
          style="fill:#cccccc;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 452.62167,229.3186 5.21198,14.16486 7.29681,0.56662 -2.08478,-16.14798 z"
          id="path3241" />
        <path
          style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 450.56461,113.5679 h 61.8627"
          id="path2394" />
        <path
          style="fill:#b3b3b3;fill-rule:nonzero;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:4"
          inkscape:connector-curvature="0"
          stroke-miterlimit="4"
          id="path2400"
          d="m 498.62714,156.85487 a 16.584475,18.028923 0 1 1 -33.16895,0 16.584475,18.028923 0 1 1 33.16895,0 z" />
        <path
          style="fill:#80e5ff;fill-rule:nonzero;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:4"
          inkscape:connector-curvature="0"
          stroke-miterlimit="4"
          d="m 492.83575,156.85487 a 10.793091,11.733133 0 1 1 -21.58618,0 10.793091,11.733133 0 1 1 21.58618,0 z"
          id="path2402" />
        <path
          style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 453.67666,227.99668 h 58.44049"
          id="path2417" />
        <path
          style="fill:#ff0000;fill-rule:nonzero;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:4"
          inkscape:connector-curvature="0"
          stroke-miterlimit="4"
          d="m 479.67346,198.56137 h 4.73844 v 77.26679 h -4.73844 z"
          id="rect2414" />
        <path
          style="fill:#cccccc;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 509.35697,226.15086 c 0,0 21.05969,-52.65588 4.21197,-103.30856 0.78974,89.85842 -21.84942,103.30856 -21.84942,103.30856 z"
          id="path2425" />
        <rect
          style="fill:#ffffff;fill-rule:nonzero;stroke-width:3;stroke-linecap:round;stroke-miterlimit:4"
          stroke-miterlimit="4"
          id="rect2429"
          width="34.470276"
          height="83.713531"
          x="672.60468"
          y="-389.67041"
          transform="matrix(0.18343478,0.20122734,-0.18343478,0.20122734,291.74655,87.84773)" />
        <path
          style="fill:none;fill-rule:nonzero;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:4"
          inkscape:connector-curvature="0"
          stroke-miterlimit="4"
          id="path2431"
          d="m 492.83575,156.85487 a 10.793091,11.733133 0 1 1 -21.58618,0 10.793091,11.733133 0 1 1 21.58618,0 z" />
        <path
          style="fill:#d20000;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 506.1095,109.2753 c 0,0 -8.16068,-23.180055 -23.69214,-35.485505 14.21524,29.762035 6.84436,35.485505 6.84436,35.485505 z"
          id="path2437" />
        <path
          style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 519.91931,199.1337 c 0,0 27.90393,-0.37778 11.05628,76.69446 0,0 -1.57947,-64.35379 -16.32123,-56.41986"
          id="path3211" />
        <path
          style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          id="path3215"
          d="m 444.24673,199.1337 c 0,0 -27.90408,-0.37778 -11.05633,76.69446 0,0 1.57947,-64.35379 16.32123,-56.41986" />
        <path
          style="fill:#ffffff;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 454.25006,108.41678 c 0,0 13.95203,-29.475862 25.53479,-37.202531 11.58286,-7.7267 -25.27154,37.774871 -25.53479,37.202531 z"
          id="path3237" />
        <path
          style="fill:#ffffff;fill-rule:evenodd;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 446.03223,186.74307 c -0.8245,-0.49765 -5.92191,-41.35026 6.70114,-66.77717 7.78332,-6.81024 18.37289,-3.22869 17.86972,-0.40473 -4.35901,24.46296 -19.66736,70.14168 -24.57086,67.1819 z"
          id="path3239" />
        <path
          style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3"
          inkscape:connector-curvature="0"
          d="m 481.66812,67.248428 c -8.02402,6.942398 -69.69934,65.128842 -22.98169,176.556102 h 46.54151 0.17102 C 552.11639,132.37779 490.4415,74.199982 482.4173,67.257279 l -0.74918,-0.0088 z"
          id="path2382" />
      </g>
      <path
        style="fill:#e73900;fill-rule:evenodd;stroke-width:2.13210028pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1756" />
      <path
        style="fill:#e73900;fill-rule:evenodd;stroke-width:2.13209993pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1755" />
      <path
        style="fill:#e73900;fill-rule:evenodd;stroke-width:2.13209993pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1754" />
      <path
        style="fill:#e78c00;fill-rule:evenodd;stroke-width:2.13209957pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1753" />
      <path
        style="fill:#e78c00;fill-rule:evenodd;stroke-width:2.13210028pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1752" />
      <path
        style="fill:#e7e100;fill-rule:evenodd;stroke-width:2.13210028pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1751" />
      <path
        style="fill:#e78c00;fill-rule:evenodd;stroke-width:2.13209993pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1750" />
      <path
        style="fill:#e7e100;fill-rule:evenodd;stroke-width:2.13209921pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1749" />
      <path
        style="fill:#e7e100;fill-rule:evenodd;stroke-width:2.13209921pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1748" />
      <path
        style="fill:#ffff9e;fill-rule:evenodd;stroke-width:2.13210171pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1747" />
      <path
        style="fill:#ffff9e;fill-rule:evenodd;stroke-width:2.13210171pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1746" />
      <path
        style="fill:#ffff9e;fill-rule:evenodd;stroke-width:2.13210171pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_1745" />
      <path
        style="fill:#e73900;fill-rule:evenodd;stroke-width:2.13210028pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_13" />
      <path
        style="fill:#e73900;fill-rule:evenodd;stroke-width:2.13209993pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_12" />
      <path
        style="fill:#e73900;fill-rule:evenodd;stroke-width:2.13209993pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_11" />
      <path
        style="fill:#e78c00;fill-rule:evenodd;stroke-width:2.13209957pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_10" />
      <path
        style="fill:#e78c00;fill-rule:evenodd;stroke-width:2.13210028pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_9" />
      <path
        style="fill:#e7e100;fill-rule:evenodd;stroke-width:2.13210028pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_8" />
      <path
        style="fill:#e78c00;fill-rule:evenodd;stroke-width:2.13209993pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_7" />
      <path
        style="fill:#e7e100;fill-rule:evenodd;stroke-width:2.13209921pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_6" />
      <path
        style="fill:#e7e100;fill-rule:evenodd;stroke-width:2.13209921pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_5" />
      <path
        style="fill:#ffff9e;fill-rule:evenodd;stroke-width:2.13210171pt"
        inkscape:connector-curvature="0"
        d=""
        id="svg_4" />
      <g
        id="svg_1758"
        transform="matrix(2.1320995,0,0,2.1320995,-686.53718,-194.38429)" />
      <g
        id="svg_15"
        transform="matrix(2.1320995,0,0,2.1320995,-686.53718,-194.38429)">
        <path
          style="fill:#ffff9e;fill-rule:evenodd;stroke-width:1.0000011pt"
          inkscape:connector-curvature="0"
          d=""
          id="svg_3" />
        <path
          style="fill:#ffff9e;fill-rule:evenodd;stroke-width:1.0000011pt"
          inkscape:connector-curvature="0"
          d=""
          id="svg_2" />
      </g>
    </svg>
  `;

  const RiskOppSVG = `
    <svg viewBox="0 0 122.88 111.54" xmlns="http://www.w3.org/2000/svg">
      <path fill="#cf1f25" d="M2.35 84.42 45.28 10.2l.17-.27a23 23 0 0 1 7.05-7.24A17 17 0 0 1 61.57 0a16.7 16.7 0 0 1 9.11 2.69 22.79 22.79 0 0 1 7 7.26l.36.63 42.23 73.34.24.44a22.48 22.48 0 0 1 2.37 10.19 17.63 17.63 0 0 1-2.17 8.35 15.94 15.94 0 0 1-6.93 6.6l-.58.26a21.19 21.19 0 0 1-9.11 1.75H17.61l-.65 0a18.07 18.07 0 0 1-6.2-1.15A16.42 16.42 0 0 1 3 104.24a17.53 17.53 0 0 1-3-9.57 23 23 0 0 1 1.57-8.74 7.66 7.66 0 0 1 .77-1.51Z"/>
      <path fill="#fec901" fill-rule="evenodd" d="M9 88.75 52.12 14.16c5.24-8.25 13.54-8.46 18.87 0l42.43 73.69c3.39 6.81 1.71 16-9.33 15.77H17.61C10.35 103.8 5.67 97.43 9 88.75Z"/>
      <path fill="#010101" d="M57.57 83.78A5.53 5.53 0 0 1 61 82.2a5.6 5.6 0 0 1 2.4.36 5.7 5.7 0 0 1 2 1.3 5.56 5.56 0 0 1 1.54 5 6.23 6.23 0 0 1-.42 1.35 5.57 5.57 0 0 1-5.22 3.26 5.72 5.72 0 0 1-2.27-.53A5.51 5.51 0 0 1 56.28 90a5.18 5.18 0 0 1-.36-1.27 5.83 5.83 0 0 1-.06-1.31 6.53 6.53 0 0 1 .57-2 4.7 4.7 0 0 1 1.14-1.56Zm8.15-10.24c-.19 4.79-8.31 4.8-8.49 0-.82-8.21-2.92-29.34-2.86-37.05.07-2.38 2-3.79 4.56-4.33a12.83 12.83 0 0 1 5 0c2.61.56 4.65 2 4.65 4.44v.24L65.72 73.54Z"/>
    </svg>
  `;


  const trendupSvg = `
    <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M244.00244,56.00513V120a12,12,0,0,1-24,0V84.9707l-75.51465,75.51465a11.99973,11.99973,0,0,1-16.9707,0L96.00244,128.9707,32.48779,192.48535a12.0001,12.0001,0,0,1-16.9707-16.9707l72-72a11.99973,11.99973,0,0,1,16.9707,0l31.51465,31.51465L203.03174,68h-35.0293a12,12,0,0,1,0-24h63.99512c.39746-.00024.79541.02075,1.1914.06006.167.01636.32911.04785.49366.071.22314.0315.44629.05786.66748.10181.19238.03809.37793.09131.56689.13843.19092.04761.3833.09009.57276.14721.18505.05616.36377.126.54492.19068.18847.06714.37793.12939.56347.2063.16846.06982.33008.1521.49415.22949.19091.08936.3833.17432.57031.27441.15527.0835.30273.17847.4541.26856.18506.10986.37207.21484.55225.33545.16455.11035.31884.2334.478.35156.15479.11523.31348.22314.46387.34692.28467.23365.55664.4812.81787.73951.019.01879.04.03418.05908.05322s.03467.04.05371.05908c.2583.262.50635.53418.73975.81885.12012.146.22461.2998.33691.45019.12159.16309.24805.32251.36133.49195.11865.177.22168.36084.33008.54272.0918.1543.189.30518.27393.46387.09863.18408.18213.37329.2705.56128.07862.16723.16211.33179.2334.50317.07569.18311.13721.37036.20362.55664.06591.18311.13623.36377.19287.551.05713.18823.09912.37964.14648.56982.04736.18946.10059.37622.13916.56909.04346.22071.07031.44361.10156.666.02344.16553.05518.32788.07129.49536Q244.00171,55.40808,244.00244,56.00513Z"/>
    </svg>
  `;

  const trenddownSvg = `
  <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M233.71191,211.86438c-.17529.025-.34765.05847-.52539.07581-.394.03881-.78906.05981-1.18408.05981h-64a12,12,0,1,1,0-24h35.0293l-67.0293-67.0293-31.51465,31.51465a11.99973,11.99973,0,0,1-16.9707,0l-72-72a12.0001,12.0001,0,0,1,16.9707-16.9707L96.00244,127.0293l31.51465-31.51465a11.99973,11.99973,0,0,1,16.9707,0l75.51465,75.51465V136a12,12,0,0,1,24,0v63.99487q0,.59657-.06006,1.19141c-.01611.16748-.04785.33-.07129.49536-.03125.22241-.0581.44531-.10156.66614-.03857.19275-.0918.37951-.13916.569-.04736.19031-.08935.38147-.14648.56982-.05664.1875-.12744.36841-.19287.552-.06641.18567-.12793.37256-.20362.55542-.07129.17188-.15478.33655-.23388.50415-.08789.18775-.17139.37659-.27.56043-.085.15881-.18213.30957-.27393.464-.1084.18188-.21143.36572-.33008.54272-.11328.16944-.23974.32874-.36133.492-.1123.15027-.21679.3042-.33691.45019-.2334.28467-.48145.55689-.73975.81873-.019.01916-.03466.04016-.05371.0592s-.04.03443-.05908.05322c-.26123.25831-.5332.50586-.81787.73951-.1499.12317-.30762.23071-.46191.34546-.15967.11865-.315.24243-.48047.35327-.17823.11938-.36328.22314-.54639.332-.15332.09131-.30322.18762-.46094.27221-.18408.09864-.37353.18238-.562.27063-.167.07874-.33105.16224-.50244.23328-.18213.07544-.36816.13648-.55322.20239-.18457.06629-.3667.13721-.55567.19446-.18359.05554-.36963.09619-.55468.1427-.19483.04907-.38721.10352-.58545.14282C234.13721,211.80908,233.92432,211.834,233.71191,211.86438Z"/>
  </svg>
  `;

  function formatDate(dateStr){
    if(!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  }

  const SvgInitActivi = {
    quest: `
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
                <path d="M3 5.5L8 4v15l-5 1.5V5.5z"  />
                <path d="M9 4l6 1.5v15L9 19V4z" />
                <path d="M16 5.5l5-1.5v15l-5 1.5V5.5z"/>
              </svg>
    `,


    message: `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.31" fill="currenColor" stroke="currentColor" class="message-render">
                <path class="cls-1" d="M51.46,93.86c12.9,12.44,31.14,16.2,49.38,8.43l15.31,6-5.07-12.06c17-13.63,14-32.35,1.44-45.11A44.05,44.05,0,0,1,107.65,65,51.25,51.25,0,0,1,93.58,81,62.69,62.69,0,0,1,73.92,91a70.44,70.44,0,0,1-22.46,2.9ZM31.58,54.07a3.11,3.11,0,0,1,0-6.21H61.51a3.11,3.11,0,0,1,0,6.21Zm0-17.22a3.11,3.11,0,0,1,0-6.21H74.34a3.11,3.11,0,0,1,0,6.21ZM54.28,0h0C68.81.47,81.8,5.62,91.09,13.59c9.49,8.13,15.17,19.2,14.82,31.27v0C105.54,57,99.19,67.71,89.22,75.28,79.44,82.7,66.15,87.07,51.66,86.65A63.91,63.91,0,0,1,40,85.24a60.48,60.48,0,0,1-9.87-3L6.69,91.44l7.83-18.63A44,44,0,0,1,4,59.5,36.67,36.67,0,0,1,0,41.79C.38,29.7,6.73,19,16.7,11.4,26.48,4,39.78-.4,54.26,0Zm-.15,6.18h-.05C41,5.83,29.14,9.72,20.44,16.32,11.92,22.78,6.5,31.84,6.2,42A30.49,30.49,0,0,0,9.55,56.71,38.76,38.76,0,0,0,20.17,69.47L22,70.93,18.08,80.3l12.08-4.75,1.17.5a55.08,55.08,0,0,0,9.91,3.13,58.52,58.52,0,0,0,10.59,1.29c13,.38,25-3.51,33.66-10.12C94,63.89,99.42,54.84,99.73,44.72v0c.29-10.11-4.56-19.45-12.66-26.4C78.79,11.19,67.16,6.61,54.15,6.21Z"/>
              </svg>

    `,

    joinedplatform: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" lass="user-joined" fill="currentColor" aria-hidden="true" width="14.5" height="14.5">
                    <path transform="scale(0.046875)" d="M159.131,169.721c5.635,58.338,43.367,96.867,96.871,96.867c53.502,0,91.23-38.53,96.867-96.867l7.988-63.029 C365.812,44.768,315.281,0,256.002,0c-59.281,0-109.812,44.768-104.86,106.692L159.131,169.721z"/>
                    <path transform="scale(0.046875)" d="M463.213,422.569l-3.824-24.35c-3.203-20.417-16.035-38.042-34.475-47.361l-80.473-40.693 c-2.519-1.274-4.57-3.194-6.289-5.338c-23.297,24.632-51.6,39.12-82.15,39.12c-30.549,0-58.856-14.488-82.152-39.12 c-1.719,2.144-3.77,4.064-6.289,5.338l-80.472,40.693c-18.442,9.319-31.272,26.944-34.475,47.361l-3.826,24.35 c-1.363,8.692,0.436,21.448,8.222,27.825C67.42,458.907,105.875,512,256.002,512c150.125,0,188.578-53.093,198.988-61.606 C462.779,444.017,464.576,431.261,463.213,422.569z"/>
                </svg> 
    `,


    level: `
                      <svg viewBox="0 0 24 24" width="16" height="16"   xmlns="http://www.w3.org/2000/svg" class="star" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                      </svg>   
    `
  };

  function renderAnalyticsChart(type = "users", range = "7d", backend = null) {

    let rawData;
    let svgId;
    let metricLabels;


    console.log("Backend:", backend)
    console.log("type of:", type)

    if (type === "users") {

      svgId = "userGrowthChart";

      rawData = backend?.chart || {
        total: [],
        active: [],
        new: []
      };

      metricLabels = {
        total: "Total Users",
        active: "Active Users",
        new: "New Users"
      };

    }

    else if (type === "quests") {

      svgId = "questGrowthChart";

      rawData = backend || {
        started: [],
        completed: [],
        abandoned: []
      };

      console.log("Rawdata:", rawData)

      metricLabels = {
        started: "Started",
        completed: "Completed",
        abandoned: "Abandoned"
      };

    }

    else if (type === "chats") {

      svgId = "chatGrowthChart";

      rawData = backend || {
        labels: [],
        messages: [],
        members: [],
        engagement: []
      };

      metricLabels = {
        messages: "Total Messages",
        members: "Active Members",
        engagement: "Messages per Member"
      };

    }

    ChartEngine.setTarget(svgId);
    ChartEngine.render(rawData, range, metricLabels);
  }

  function timeAgo(dateStr) {

    if (!dateStr) return "";

    if (!dateStr.endsWith("Z") && !dateStr.includes("+")) {
      dateStr = dateStr + "Z";
    }

    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);

    if (seconds < 5) return "just now";

    const intervals = [
      { label: "year",   secs: 31536000 },
      { label: "month",  secs: 2592000 },
      { label: "day",    secs: 86400 },
      { label: "hr",     secs: 3600 },
      { label: "min",    secs: 60 },
      { label: "sec",    secs: 1 }
    ];

    for (const i of intervals) {
      const count = Math.floor(seconds / i.secs);
      if (count >= 1) {
        return count + " " + i.label + (count > 1 ? "s" : "") + " ago";
      }
    }

    return "";
  }




  function showSegmentTable(type){

    const card = document.getElementById("segmentsCard");

    card.classList.add("active");

    document.getElementById("segmentsView").style.display = "none";
    document.getElementById("segmentsTable").style.display = "block";

    renderUsers(type);

  }

  function renderUsers(type){

    const tbody = document.querySelector("#segmentsTable tbody");

    const filtered = USERS.filter(u => u.status === type);

    tbody.innerHTML = filtered.map(u => `
      <tr>
        <td>${u.name}</td>
        <td>${timeAgo(u.last)}</td>
        <td>${formatDate(u.joined)}</td>
        <td><span class="badge ${u.status}">${u.status}</span></td>
      </tr>
    `).join("");

  }

  const ChartEngine = (() => {

    let svg = null;
    let gridG, linesG, xLabelsG, yLabelsG;
    let crosshairG = null;
    let crosshairLine = null;


    let tooltip = null;


    function setTarget(id){

      svg = document.getElementById(id);

      if(!svg) return;

      gridG   = svg.querySelector(".grid");
      linesG  = svg.querySelector(".lines");
      xLabelsG = svg.querySelector(".x-labels");
      yLabelsG = svg.querySelector(".y-labels");

      crosshairG = svg.querySelector(".crosshair");

      tooltip = svg.parentElement.querySelector(".chart-tooltip");

      /* ✅ ALWAYS RESET */
      crosshairLine = null;

      if(crosshairG){

        crosshairG.innerHTML = ""; // remove old line

        crosshairLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        crosshairLine.setAttribute("class","crosshair-line");

        crosshairLine.style.opacity = 0;

        crosshairG.appendChild(crosshairLine);
      }
    }




    
    const HEIGHT = 260;

    const PADDING = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };



    let hiddenMetrics = new Set();
    let resizeObserver = null;
    let lastData = null;

    let METRICS = [];

    /* ---------- LABELS ---------- */


    /* ---------- NORMALIZE ---------- */

    function normalizeData(raw){

      const labels = raw.labels || [];

      const series = {};

      Object.keys(raw).forEach(key => {

        if (key === "labels") return;

        if (Array.isArray(raw[key])) {
          series[key] = raw[key];
        }

      });

      return { labels, series };
    }

    /* ---------- PATH BUILDER (CURVED) ---------- */

    function buildPath(values, scaleX, scaleY){

      let path = "";

      values.forEach((v,i)=>{

        const x = scaleX(i);
        const y = scaleY(v);

        if(i === 0){
          path += `M ${x},${y}`;
        }else{

          const prevX = scaleX(i-1);
          const prevY = scaleY(values[i-1]);

          const cx = (prevX + x) / 2;

          path += ` C ${cx},${prevY} ${cx},${y} ${x},${y}`;
        }

      });

      return path;
    }

    /* ---------- DRAW ---------- */

    function draw(data){

      if(!svg) return;

      lastData = data;

      const rect = svg.getBoundingClientRect();

      const WIDTH = rect.width || 600;

      const chartWidth  = WIDTH - PADDING.left - PADDING.right;
      const chartHeight = HEIGHT - PADDING.top - PADDING.bottom;

      svg.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

      gridG.innerHTML   = "";
      linesG.innerHTML  = "";
      xLabelsG.innerHTML = "";
      yLabelsG.innerHTML = "";

      const labels = data.labels;
      const series = data.series;

      const allValues = Object.values(series)
        .flat()
        .filter(v => typeof v === "number");

      const maxVal = Math.max(...allValues, 10) * 1.15;

      const stepX = chartWidth / Math.max(labels.length - 1, 1);

      const scaleX = i => PADDING.left + stepX * i;

      const scaleY = v =>
        PADDING.top +
        chartHeight -
        (v / maxVal) * chartHeight;

      /* ---------- GRID + Y ---------- */

      const ySteps = 4;

      for(let i=0;i<=ySteps;i++){

        const y = PADDING.top + (chartHeight / ySteps) * i;
        const value = Math.round(maxVal - (maxVal / ySteps) * i);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        line.setAttribute("x1", PADDING.left);
        line.setAttribute("x2", WIDTH - PADDING.right);
        line.setAttribute("y1", y);
        line.setAttribute("y2", y);

        gridG.appendChild(line);

        const label = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        label.setAttribute("x", PADDING.left - 10);
        label.setAttribute("y", y + 4);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("class","axis-text");

        label.textContent = value.toLocaleString();

        yLabelsG.appendChild(label);
      }

      /* ---------- X LABELS ---------- */

      labels.forEach((lab,i)=>{

        const x = scaleX(i);

        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        text.setAttribute("x", x);
        text.setAttribute("y", HEIGHT - 8);
        text.setAttribute("text-anchor","middle");
        text.setAttribute("class","axis-text");

        text.textContent = lab;

        xLabelsG.appendChild(text);
      });

      /* ---------- LINES ---------- */

      METRICS.forEach(m=>{

        if(hiddenMetrics.has(m.key)) return;

        const values = series[m.key];

        const pathEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );

        pathEl.setAttribute(
          "d",
          buildPath(values, scaleX, scaleY)
        );

        pathEl.setAttribute(
          "class",
          `line-path ${m.class}`
        );

        pathEl.dataset.metric = m.key;

        linesG.appendChild(pathEl);

      });

      setupHover(labels, series, scaleX, scaleY, stepX);
    }

    /* ---------- HOVER ---------- */

    function setupHover(labels, series, scaleX, scaleY, stepX){

      if(!tooltip) return;

      let side = "right"; // remembers last side
      const container = svg.parentElement;

      function smartPosition(clientX, clientY){

        const containerRect = container.getBoundingClientRect();

        const tipRect = tooltip.getBoundingClientRect();

        const tipWidth  = tipRect.width  || 120;
        const tipHeight = tipRect.height || 50;

        const containerWidth  = containerRect.width;
        const containerHeight = containerRect.height;

        const cursorX = clientX - containerRect.left;
        const cursorY = clientY - containerRect.top;

        let left;
        let top;

        /* ---------- SIDE LOCK LOGIC ---------- */

        if(side === "right"){

          left = cursorX + 12;

          // if overflow → flip to left
          if(left + tipWidth > containerWidth){
            side = "left";
            left = cursorX - tipWidth - 12;
          }

        }else{

          left = cursorX - tipWidth - 12;

          // if overflow → flip back to right
          if(left < 0){
            side = "right";
            left = cursorX + 12;
          }

        }

        /* clamp safety */
        if(left < 0) left = 6;
        if(left + tipWidth > containerWidth){
          left = containerWidth - tipWidth - 6;
        }

        /* ---------- VERTICAL ---------- */

        top = cursorY - 10;

        if(top < 0){
          top = cursorY + 14;
        }

        if(top + tipHeight > containerHeight){
          top = containerHeight - tipHeight - 6;
        }

        tooltip.style.left = left + "px";
        tooltip.style.top  = top + "px";
      }


      svg.onmousemove = e => {

        const rect = svg.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if(crosshairLine){

          const clampedX = Math.max(
            PADDING.left,
            Math.min(
              rect.width - PADDING.right,
              x
            )
          );

          crosshairLine.setAttribute("x1", clampedX);
          crosshairLine.setAttribute("x2", clampedX);

          crosshairLine.setAttribute("y1", PADDING.top);
          crosshairLine.setAttribute(
            "y2",
            HEIGHT - PADDING.bottom
          );

          crosshairLine.style.opacity = 1;
        }
                const rawIndex = (x - PADDING.left) / stepX;

        const i1 = Math.floor(rawIndex);
        const i2 = Math.min(i1 + 1, labels.length - 1);

        const t = rawIndex - i1;

        if(i1 < 0 || i1 >= labels.length) return;

        /* interpolate values */
        function lerp(a,b,t){ return a + (b-a)*t; }

        const values = {};

        Object.keys(series).forEach(metric => {

          const v1 = series[metric][i1] ?? 0;
          const v2 = series[metric][i2] ?? v1;

          values[metric] = Math.round(lerp(v1,v2,t));
        });

        const label = labels[i1];

        tooltip.style.opacity = 1;

        function row(metric, label, value){

          if(hiddenMetrics.has(metric)) return "";

          return `
            <div class="tt-row">
              <span class="tt-dot ${metric}"></span>
              <span>${label}</span>
              <span>${value.toLocaleString()}</span>
            </div>
          `;
        }

        let rows = "";

        Object.keys(CURRENT_LABELS).forEach(metric => {

          if(values[metric] == null) return;

          const labelName =
            CURRENT_LABELS[metric] || metric;

          rows += row(metric, labelName, values[metric]);

        });

        tooltip.innerHTML = `
          <div class="tt-title">${label}</div>
          ${rows}
        `;



        smartPosition(e.clientX, e.clientY);
      };

      svg.onmouseleave = () => {

        tooltip.style.opacity = 0;

        if(crosshairLine){
          crosshairLine.style.opacity = 0;
        }
      };

    }


    /* ---------- RENDER ---------- */

    let CURRENT_LABELS = {};


    function render(rawData, range, labelsMap = {}){


      CURRENT_LABELS = labelsMap;

      const data = normalizeData(rawData);

      METRICS = Object.keys(data.series).map(key => ({
        key,
        class: "line-" + key
      }));

      console.log(data);


      draw(data);
    }


    function toggleMetric(metric){

      if(hiddenMetrics.has(metric)){
        hiddenMetrics.delete(metric);
      }else{
        hiddenMetrics.add(metric);
      }

      if(lastData) draw(lastData);
    }

    return {
      setTarget,
      render,
      toggleMetric
    };

  })();

  const MappedQuestSc = {
    failed: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 508.33">
        <path fill="#EB0100" fill-rule="evenodd" d="M317.99 323.62c-17.23-19.89-35.3-40.09-54.23-60.09-62.06 59.35-119.53 126.18-161.12 201.73-51.02 92.68-126.31 16.84-92.15-50.33 27.46-61.28 98.07-146.3 182.94-220.07-46.74-41.72-97.97-79.34-154.08-107.07C-42.76 47.2 19.97-20.82 79.37 6.16c50.04 19.82 119.09 70.85 182.26 134.32 63.11-45.86 129.55-81.8 189.45-95.87 13-3.06 50.95-11.33 59.69 1.04 3.29 4.67-.33 11.68-7.08 19.29-22.99 25.96-84.78 67.12-114.72 90.82-21.61 17.11-43.55 34.99-65.37 53.71 23.2 28.81 43.94 58.64 60.47 88.17 14.37 25.66 25.55 51.1 32.42 75.46 3.14 11.13 11.75 43.64 1.38 51.66-3.91 3.03-10.11.16-16.95-5.38-23.34-18.89-61.29-70.77-82.93-95.76z"/>
      </svg>
    `,

    completed: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.48 122.88" width="16" height="16">
        <path fill="#f39d00" d="M3.21,18.74H19.86q0-4,.06-8.26V0H93.05V10.49c0,2.92,0,5.66,0,8.26h17.24a3.08,3.08,0,0,1,3.07,2.93,77.67,77.67,0,0,1-.4,13.9A34,34,0,0,1,109.11,48a21.77,21.77,0,0,1-8.8,8.6A31.91,31.91,0,0,1,86.41,60C83.14,65.43,78.78,68,73.68,72.67c-6.17,4.71-10.81,8.26-7.2,19.13h5.39a7.84,7.84,0,0,1,7.82,7.82v3.15h.77A7.69,7.69,0,0,1,85.91,105h0a7.67,7.67,0,0,1,2.26,5.45v5.23a1.77,1.77,0,0,1-1.77,1.77H26.58a1.77,1.77,0,0,1-1.77-1.77v-5.23A7.66,7.66,0,0,1,27.07,105h0a7.66,7.66,0,0,1,5.44-2.26h.77V99.62a7.75,7.75,0,0,1,2.3-5.51v0a7.81,7.81,0,0,1,5.51-2.29h6.06c3.22-10.26-1-13.58-6.83-18.17A44.47,44.47,0,0,1,27.34,60,31.87,31.87,0,0,1,13,56.54a21.47,21.47,0,0,1-8.73-8.6A34.07,34.07,0,0,1,.51,35.58,78.1,78.1,0,0,1,.13,21.9v-.08a3.08,3.08,0,0,1,3.09-3.08ZM92.71,30a121.67,121.67,0,0,1-2,18,15.17,15.17,0,0,0,5-1.9,10.49,10.49,0,0,0,3.69-3.89,18,18,0,0,0,1.93-6,45.37,45.37,0,0,0,.5-6.25H92.71ZM20.12,30H12a49.78,49.78,0,0,0,.45,6.27,18.41,18.41,0,0,0,1.8,6,10.13,10.13,0,0,0,3.57,3.88A14.57,14.57,0,0,0,22.54,48a92,92,0,0,1-2.42-18Z"/>
        
        <path fill="#f9c809" d="M20.08,21.82H3.21C2.75,31.1,3.34,40,7,46.43c3.43,6.11,9.7,10.15,20.62,10.46a27.9,27.9,0,0,1-3.48-5.51c-6.56-.88-10.36-3.59-12.54-7.67S8.94,34.32,8.94,28.14a1.23,1.23,0,0,1,1.23-1.23h9.91V21.82Zm72.77,5.1h10.82a1.23,1.23,0,0,1,1.23,1.22c0,6.2-.56,11.54-2.84,15.6s-6.16,6.75-12.7,7.64a25.38,25.38,0,0,1-3.69,5.52c11-.29,17.29-4.33,20.77-10.45,3.67-6.47,4.29-15.34,3.84-24.62H92.85v5.09Z"/>
        
        <path fill="#222" d="M79.69,102.76h.77A7.69,7.69,0,0,1,85.91,105h0a7.67,7.67,0,0,1,2.26,5.45v10.63a1.77,1.77,0,0,1-1.77,1.77H26.58a1.77,1.77,0,0,1-1.77-1.77V110.48A7.66,7.66,0,0,1,27.07,105h0a7.66,7.66,0,0,1,5.44-2.26H79.69Z"/>
        
        <path fill="#ead79e" d="M70.64,108H35.72a4.22,4.22,0,0,0-3,1.25h0a4.26,4.26,0,0,0-1.25,3v5.28H81.55v-5.28a4.26,4.26,0,0,0-1.26-3,4.31,4.31,0,0,0-3-1.26Z"/>
        
        <path fill="#f8b705" d="M50.71,93h6V75.21c-22.17-7.88-24.26-35-29.55-72.57H22.53V29.41C23,39.6,24.68,47.14,27,52.91a38.19,38.19,0,0,0,8.39,12.8,68.65,68.65,0,0,0,6.71,5.78C49.11,77,54.19,81,50.71,93Z"/>
        
        <path fill="#fac809" d="M56.71,93H63c-3.88-12.71,1.68-17,9-22.55,8.05-6.14,18.5-14.12,18.5-40.35V2.64H27.16C30.58,26.92,32.66,46.81,39.67,60A39.14,39.14,0,0,0,49,71.13a29.3,29.3,0,0,0,5.47,3.17,19.1,19.1,0,0,0,2.21.74v.15l.07,0V93Z"/>
        
        <path fill="#f39d00" d="M58.26,20.13,61.06,27l7.39.56a1.9,1.9,0,0,1,1,3.41l-5.59,4.74,1.76,7.18a1.9,1.9,0,0,1-1.41,2.29,1.88,1.88,0,0,1-1.49-.26L56.5,41l-6.29,3.89a1.9,1.9,0,0,1-2.62-.62,1.85,1.85,0,0,1-.23-1.44l1.75-7.18-5.66-4.8a1.91,1.91,0,0,1,1.09-3.35L51.93,27l2.81-6.84a1.91,1.91,0,0,1,3.52,0Z"/>
        
        <polygon fill="#fff" points="56.5 20.86 59.75 28.78 68.31 29.43 61.76 34.98 63.79 43.3 56.5 38.79 49.21 43.3 51.24 34.98 44.69 29.43 53.24 28.78 56.5 20.86"/>
        
        <path fill="#fff" fill-rule="evenodd" d="M76.62,47.62l-.07.1a3.79,3.79,0,0,0-5.17.83l-.1-.08a3.52,3.52,0,0,0,.62-2.75,3.57,3.57,0,0,0-1.44-2.42,26.79,26.79,0,0,0,2.82.53,3.58,3.58,0,0,0,2.42-1.45l.1.07a3.81,3.81,0,0,0,.82,5.17ZM84.27,34.8l-.07.1a3.78,3.78,0,0,0-5.17.82l-.1-.07a3.79,3.79,0,0,0-.83-5.17l.07-.1a3.8,3.8,0,0,0,5.18-.83l.09.08a3.79,3.79,0,0,0,.83,5.17Zm.06-13.56-.13.18a6.94,6.94,0,0,0-9.46,1.51l-.18-.13a6.5,6.5,0,0,0,1.14-5,6.49,6.49,0,0,0-2.65-4.43l.13-.18a6.94,6.94,0,0,0,9.46-1.51l.18.13a6.5,6.5,0,0,0-1.14,5,6.51,6.51,0,0,0,2.65,4.43Z"/>
      </svg>
    `,


    started: `
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" style="flex-shrink: 0"
                        width="16"
                        height="16"
                        fill="#e67e22"
                        stroke="#e67e22"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round">
                    <path d="M13 3 
                            C12.6 2.5,12 2.5,11.7 3 
                            L5.5 12.2 
                            C5.2 12.7,5.5 13.3,6 13.3 
                            H10 
                            V21 
                            C10 21.5,10.7 21.7,11.1 21.3 
                            L18.2 12.3 
                            C18.6 11.8,18.3 11.2,17.7 11.2 
                            H13 
                            V3 Z"/>
                    </svg> 
    `,

  }


  function renderQuestActivity(list) {

    const container = document.getElementById("QuestActivityfee");

    if (!list || !list.length) {
      container.innerHTML = `<div class="activity-empty">No activity yet</div>`;
      return;
    }

    container.innerHTML = list.map(item => {

      const icon = MappedQuestSc[item.status] || MappedQuestSc.started;

      return `
        <div class="activity-item">

          <div class="activity-icon ${item.status}">
            ${icon}
          </div>

          <div class="activity-content">
            <div class="activity-text">
              <b>${item.user}</b>
              ${item.status}
              <span class="activity-highlight">${item.quest}</span>
            </div>

            <div class="activity-time">
              ${timeAgo(item.time)}
            </div>
          </div>

        </div>
      `;

    }).join("");

  }


  function renderTopReviewers(list) {

    const container = document.querySelector("#top-reviewers .reviewer-list");

    if (!list || !list.length) {
      container.innerHTML = `<div class="activity-empty">No reviewers yet</div>`;
      return;
    }

    container.innerHTML = list.map(user => `
      
      <div class="reviewer-row">
        <img src="${user.avatar}" class="reviewer-avatar">

        <div class="reviewer-info">
          <div class="reviewer-name">${user.name}</div>
          <div class="reviewer-meta">
            Reviewed ${user.reviews.toLocaleString()} quests
          </div>
        </div>
      </div>

    `).join("");
  }


  function renderTopQuests(list) {

    const tbody = document.querySelector("#Topperformingquests tbody");

    if (!list || !list.length) {
      tbody.innerHTML = "<tr><td colspan='5'>No data</td></tr>";
      return;
    }

    tbody.innerHTML = list.map(q => `
      <tr>
        <td>${q.name}</td>
        <td>${q.starts.toLocaleString()}</td>
        <td>${q.completed.toLocaleString()}</td>
        <td>${q.rate}%</td>
        <td><span class="badge ${q.badge}">${q.status}</span></td>
      </tr>
    `).join("");
  }


  function renderQuestLocations(data){

    const container = document.querySelector(
      "#Quest-Location .location-list"
    );

    if(!data || !data.length){
      container.innerHTML = "<div>No data</div>";
      return;
    }

    container.innerHTML = data.map(row => `
      <div class="location-row">
        <div class="location-name">${row.country}</div>
        <div class="location-bar">
          <div class="location-fill" style="width:${row.percent}%"></div>
        </div>
        <div class="location-percent">${row.percent}%</div>
      </div>
    `).join("");
  }


  function renderQuestSegments(data){

    if(!data) return;

    const order = ["easy","medium","hard","failed"];

    const circles = document.querySelectorAll(
      "#Questsegmentation .donut circle"
    );

    // first circle = background
    let offset = 0;

    order.forEach((key, i) => {

      const value = data[key] || 0;

      const circle = circles[i + 1];

      circle.setAttribute(
        "stroke-dasharray",
        `${value} ${100 - value}`
      );

      circle.setAttribute(
        "stroke-dashoffset",
        `-${offset}`
      );

      offset += value;

    });

    // legend update
    document.querySelector('[data-seg="easy"]').innerHTML =
      `<span class="dot c1"></span> Easy — ${data.easy}%`;

    document.querySelector('[data-seg="medium"]').innerHTML =
      `<span class="dot c2"></span> Medium — ${data.medium}%`;

    document.querySelector('[data-seg="hard"]').innerHTML =
      `<span class="dot c3"></span> Hard — ${data.hard}%`;


  }


  async function loadQuestAnalytics(range = "7d") {

    try {

      const res = await fetch(`/api/analytics/quests/${communitySlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ range })
      });

      if (!res.ok) {
        console.error("Quest analytics failed:", res.status);
        return;
      }

      const data = await res.json();
      console.log(data.chart);


      /* KPI */
      applyKPI(
        document.querySelector("#panel-quests .kpi-card:nth-child(1) .kpi-value"),
        document.querySelector("#panel-quests .kpi-card:nth-child(1) .kpi-trend"),
        data.started
      );

      applyKPI(
        document.querySelector("#panel-quests .kpi-card:nth-child(2) .kpi-value"),
        document.querySelector("#panel-quests .kpi-card:nth-child(2) .kpi-trend"),
        data.completed
      );

      applyKPI(
        document.querySelector("#panel-quests .kpi-card:nth-child(3) .kpi-value"),
        document.querySelector("#panel-quests .kpi-card:nth-child(3) .kpi-trend"),
        data.completion_rate,
        true
      );

      applyKPI(
        document.querySelector("#panel-quests .kpi-card:nth-child(4) .kpi-value"),
        document.querySelector("#panel-quests .kpi-card:nth-child(4) .kpi-trend"),
        data.avg_time
      );

      /* chart */
      renderAnalyticsChart("quests", range, data.chart);
      renderQuestActivity(data.quest_activity);
      renderTopReviewers(data.top_reviewers);
      renderTopQuests(data.top_performing_quests);
      renderQuestLocations(data.bestquestlocation);
      renderQuestSegments(data.questsegmentation)


    } catch (err) {
      console.error("Quest analytics error:", err);
    }
  }


  function renderRecentActivity(list = []){
  console.log("Recent activity:", list); 
    const container = document.getElementById("recentActivityContainer");


    container.innerHTML = "";

    list.forEach(item => {

      let icon = "";

      icon = SvgInitActivi.message;

      const el = document.createElement("div");
      el.className = "activity-item";

      el.innerHTML = `
        <div class="activity-icon">
          ${icon}
        </div>

        <div class="activity-content">
          <div class="activity-text">
            <b>${item.user}</b>
            sent ${item.count || 1} message${item.count > 1 ? "s" : ""}
            in #${item.channel}
          </div>

          <div class="activity-time">
            ${timeAgo(item.time)}
          </div>
        </div>
      `;

      container.appendChild(el);
    });

  }

  function renderTopChannels(channels = []) {

    const container = document.getElementById("topChannelsContainer");
    if (!container) return;

    container.innerHTML = "";

    channels.forEach(ch => {

      const el = document.createElement("div");
      el.className = "activity-item";

      el.innerHTML = `
        <div class="activity-content">
          <div class="activity-text">
            #${ch.name} — 
            <span class="activity-highlight">
              ${formatNumber(ch.messages)} msgs
            </span>
          </div>
          <div class="activity-time">${ch.label || ""}</div>
        </div>
      `;

      container.appendChild(el);
    });
  }


  function renderCategoryDistribution(categories = []) {

    const container = document.getElementById("categoryDistributionContainer");
    if (!container) return;

    container.innerHTML = "";

    categories.forEach(cat => {

      const percent = Math.max(0, Math.min(100, cat.percent || 0));

      const row = document.createElement("div");
      row.className = "location-row";

      row.innerHTML = `
        <div class="location-name">${cat.name}</div>
        <div class="location-bar">
          <div class="location-fill" style="width:${percent}%"></div>
        </div>
        <div class="location-percent">${percent}%</div>
      `;

      container.appendChild(row);
    });
  }




  function renderTopMembers(members = []) {

    const container = document.getElementById("topMembersContainer");
    if (!container) return;

    container.innerHTML = "";

    members.forEach(user => {

      const avatar = user.avatar || "https://i.pravatar.cc/40";

      const row = document.createElement("div");
      row.className = "reviewer-row";

      row.innerHTML = `
        <img src="${avatar}" class="reviewer-avatar">
        <div class="reviewer-info">
          <div class="reviewer-name">${user.name}</div>
          <div class="reviewer-meta">
            Sent ${formatNumber(user.messages)} messages
          </div>
        </div>
      `;

      container.appendChild(row);
    });
  }


  function formatNumber(num) {
    return new Intl.NumberFormat().format(num || 0);
  }

  async function loadChatAnalytics(range = "7d") {

    try {

      const res = await fetch(`/api/analytics/communit/chaty/${communitySlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ range })
      });

      if (!res.ok) return;

      const data = await res.json();

      applyKPI(
        document.getElementById("chatTotalMsg"),
        document.querySelector("#panel-chats .kpi-card:nth-child(1) .kpi-trend"),
        data.total_messages
      );

      applyKPI(
        document.getElementById("chatActiveUsers"),
        document.querySelector("#panel-chats .kpi-card:nth-child(2) .kpi-trend"),
        data.active_members
      );

      applyKPI(
        document.getElementById("chatMsgPerMember"),
        document.querySelector("#panel-chats .kpi-card:nth-child(3) .kpi-trend"),
        data.messages_per_member
      );
      applyKPI(
        document.getElementById("chatEngagementRate"),
        document.querySelector("#panel-chats .kpi-card:nth-child(4) .kpi-trend"),
        data.engagement_rate,
        true  
      );

      renderAnalyticsChart("chats", range, data.chart);
      renderTopChannels(data.top_channels);
      renderCategoryDistribution(data.category_distribution);
      renderTopMembers(data.top_members);
      renderRecentActivity(data.recent_activity);
    } catch (err) {
      console.error("Community analytics error:", err);
    }
  }



  function AnalyticisInit() {

    const SCROLL_MEMORY = {};

    function setupLegendToggle(){

      document.querySelectorAll(".legend-item").forEach(item => {

        item.addEventListener("click", () => {

          const metric =
            item.dataset.metric ||
            item.dataset.qmetric;   // support quest legend too

          if(!metric) return;

          item.classList.toggle("off");

          ChartEngine.toggleMetric(metric);

        });

      });

    }

      // Tab switching
      document.querySelectorAll('.tab').forEach(tab => {

        tab.addEventListener('click', async () => {

          const container = document.querySelector('.bottom-panels-anal');

          if(container){
            SCROLL_MEMORY[ANALYTICS_STATE.type] = container.scrollTop;
          }

          document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

          tab.classList.add('active');

          const newType = tab.dataset.tab;

          document.getElementById('panel-' + newType).classList.add('active');

          ANALYTICS_STATE.type = newType;

          
          /* 🔥 LOAD CORRECT ANALYTICS */
          if (newType === "quests") {
            await loadQuestAnalytics(ANALYTICS_STATE.range);

          } else if (newType === "chats") {
            await loadChatAnalytics(ANALYTICS_STATE.range); 
            // or: await loadCommunity();  ← if you have a separate function

          } else if (newType === "users") {
            await loadCommunityAnalytics(ANALYTICS_STATE.range);
          }

          requestAnimationFrame(() => {

            if(!container) return;

            const saved = SCROLL_MEMORY[newType];
            container.scrollTop = saved ?? 0;

          });

        });

      });


  let RANGE_LOADING = false;

  document.querySelectorAll('.pill').forEach(pill => {

    pill.addEventListener('click', async () => {

      if (RANGE_LOADING) return;

      document.querySelectorAll('.pill')
        .forEach(p => p.classList.remove('active'));

      pill.classList.add('active');

      const range = pill.dataset.range;

      ANALYTICS_STATE.range = range;
      
      console.log("range of:", range)
      console.log("ANALYTICS_STATE:", ANALYTICS_STATE)
      

      if (ANALYTICS_STATE.type === "users") {

        await loadCommunityAnalytics(range);

      } else if (ANALYTICS_STATE.type === "quests") {

        await loadQuestAnalytics(range);

      } else if (ANALYTICS_STATE.type === "chats") {

        await loadChatAnalytics(range);

      }

    });

  });


 
  document.getElementById("backSegments").onclick = () => {

      const card = document.getElementById("segmentsCard");

      card.classList.remove("active");

      document.getElementById("segmentsView").style.display = "flex";
      document.getElementById("segmentsTable").style.display = "none";

    };
    setupLegendToggle();
    loadCommunityAnalytics();

  }



  function applyKPI(valueEl, trendEl, obj, isPercent=false) {

    if (!valueEl || !trendEl || !obj) return;

    valueEl.textContent = isPercent
      ? obj.value + "%"
      : obj.value.toLocaleString();

    const trend = obj.trend;

    trendEl.classList.remove("up", "down");

    if (trend === null || trend === undefined) {
      trendEl.textContent = "New";
      trendEl.classList.add("up");
      return;
    }

    const arrow = trend >= 0 ? trendupSvg : trenddownSvg;
    const cls = trend >= 0 ? "up" : "down";

    trendEl.classList.add(cls);
    trendEl.innerHTML = `${arrow} ${Math.abs(trend)}%`;
  }

  function renderSegmentsView(data) {

    const view = document.getElementById("segmentsView");
    if (!view) return;

    const seg = data.segments || {};

    const active = seg.active || 0;
    const fresh = seg.new || 0;
    const inactive = seg.inactive || 0;
    const banned = seg.banned || 0;

    const offActive = 0;
    const offNew = -active;
    const offInactive = -(active + fresh);
    const offBanned = -(active + fresh + inactive);

    view.innerHTML = `
      <div class="segments-donut">

        <svg viewBox="0 0 42 42" class="donut">

          <circle cx="21" cy="21" r="15.915"
                  fill="transparent"
                  stroke="#1f2937"
                  stroke-width="6"></circle>

          <circle class="donut-segment" data-seg="active"
                  cx="21" cy="21" r="15.915"
                  fill="transparent"
                  stroke="#60a5fa"
                  stroke-width="6"
                  stroke-dasharray="${active} ${100-active}"
                  stroke-dashoffset="${offActive}"></circle>

          <circle class="donut-segment" data-seg="new"
                  cx="21" cy="21" r="15.915"
                  fill="transparent"
                  stroke="#34d399"
                  stroke-width="6"
                  stroke-dasharray="${fresh} ${100-fresh}"
                  stroke-dashoffset="${offNew}"></circle>

          <circle class="donut-segment" data-seg="inactive"
                  cx="21" cy="21" r="15.915"
                  fill="transparent"
                  stroke="#fbbf24"
                  stroke-width="6"
                  stroke-dasharray="${inactive} ${100-inactive}"
                  stroke-dashoffset="${offInactive}"></circle>

          <circle class="donut-segment" data-seg="banned"
                  cx="21" cy="21" r="15.915"
                  fill="transparent"
                  stroke="#f87171"
                  stroke-width="6"
                  stroke-dasharray="${banned} ${100-banned}"
                  stroke-dashoffset="${offBanned}"></circle>

        </svg>

        <div class="segments-legend">

          <div class="seg-item" data-seg="active">
            <span class="dot active"></span>
            Active Users — ${active}%
          </div>

          <div class="seg-item" data-seg="new">
            <span class="dot new"></span>
            New Users — ${fresh}%
          </div>

          <div class="seg-item" data-seg="inactive">
            <span class="dot inactive"></span>
            Inactive — ${inactive}%
          </div>

          <div class="seg-item" data-seg="banned">
            <span class="dot banned"></span>
            Suspended — ${banned}%
          </div>

        </div>

      </div>
    `;
  }





  function renderLatestActivity(list){

    const box = document.getElementById("ActivityFeeds");
    box.innerHTML = "";

    if(!list || !list.length){
      box.innerHTML = `<div class="empty">No recent activity</div>`;
      return;
    }

    list.forEach(act => {

      const icon = SvgInitActivi[act.type] || "";

      const html = `
        <div class="activity-item">
          <div class="activity-icon ${act.type}">
            ${icon}
          </div>

          <div class="activity-content">
            <div class="activity-text">
              <b>${act.user}</b> ${act.label}
            </div>
            <div class="activity-time">
              ${timeAgo(act.time)}
            </div>
          </div>
        </div>
      `;

      box.insertAdjacentHTML("beforeend", html);

    });

  }





  function renderLocations(list){

    const box = document.querySelector(".location-list");
    if(!box) return;

    box.innerHTML = "";

    if(!list || !list.length){
      box.innerHTML = `<div class="empty">No location data</div>`;
      return;
    }

    list.forEach(loc => {

      const html = `
        <div class="location-row">

          <div class="location-name">${loc.name}</div>

          <div class="location-bar">
            <div class="location-fill" style="width:${loc.percent}%"></div>
          </div>

          <div class="location-percent">${loc.percent}%</div>

        </div>
      `;

      box.insertAdjacentHTML("beforeend", html);

    });

  }





  function renderInsights(data) {

    const container = document.getElementById("analyticsInsights");

    const growth = data.insights.find(
      i => i.type === "growth"
    );

    const risk = data.insights.find(
      i => i.type === "risk"
    );

    container.innerHTML = `
      <div class="insight-card">
        <div class="insight-icon">
          ${GrowthOppSVG}
        </div>

        <div class="insight-title">
          ${growth?.title || "Growth Opportunity"}
        </div>

        <div class="insight-text">
          ${growth?.text || ""}
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon">
          ${RiskOppSVG}
        </div>

        <div class="insight-title">
          ${risk?.title || "Retention Risk"}
        </div>

        <div class="insight-text">
          ${risk?.text || ""}
        </div>
      </div>
    `;
  }

  
  async function loadCommunityAnalytics(range = "7d") {

    try {

      const res = await fetch(`/api/analytics/community/${communitySlug}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
          range: range
        })
      });

      if (!res.ok) {
        console.error("Analytics request failed:", res.status);
        return;
      }


      const data = await res.json();
      USERS = [];
      USERS = data.users || [];

      renderSegmentsView(data);

      renderLatestActivity(data.latest_activity);
      renderLocations(data.locations);

      const segItems = document.querySelectorAll(".seg-item");
      const segments = document.querySelectorAll(".donut-segment");

      segItems.forEach(item => {

        const type = item.dataset.seg;

        item.addEventListener("mouseenter", () => {

          segments.forEach(s => {
            if (s.dataset.seg === type) {
              s.classList.add("highlight");
            }
          });

        });

        item.addEventListener("mouseleave", () => {

          segments.forEach(s => s.classList.remove("highlight"));

        });

        item.addEventListener("click", () => {

          showSegmentTable(type);

        });

      });
      renderAnalyticsChart(
        ANALYTICS_STATE.type,
        range,
        data
      );

      applyKPI(
        document.getElementById("kpiTotal"),
        document.getElementById("kpiTotalTrend"),
        data.total
      );

      applyKPI(
        document.getElementById("kpiActive"),
        document.getElementById("kpiActiveTrend"),
        data.active
      );

      applyKPI(
        document.getElementById("kpiNew"),
        document.getElementById("kpiNewTrend"),
        data.new
      );

      applyKPI(
        document.querySelector(".kpi-card:nth-child(4) .kpi-value"),
        document.querySelector(".kpi-card:nth-child(4) .kpi-trend"),
        data.retention,
        true
      );

    } catch (err) {
      console.error("Analytics error:", err);
    }
  }


  async function loadInsights() {
    try {
      const res = await fetch(`/api/analytics/insights/${communitySlug}`);
      const data = await res.json();
      renderInsights(data);
    } catch(err) {
      console.error(err);
    }
  }

  loadInsights();
  window.AnalyticsModule = {
    init: AnalyticisInit
  };


})();


