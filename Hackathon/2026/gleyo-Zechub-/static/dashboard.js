function CalledPremium() {

    fetch(`/${communitySlug}/analytics`)
      .then(res => res.text())
      .then(html => {
        const mainContent = document.getElementById("mainContent");
        if (mainContent) {
          mainContent.innerHTML = html;
        }
      })
      .catch(err => console.error("Failed to load analytics:", err));
}



function drawUserGrowthChart(){

  const svg = document.getElementById("userGrowthChart");
  if(!svg) return;

  const gridG   = svg.querySelector(".grid");
  const linesG  = svg.querySelector(".lines");
  const xLabelsG = svg.querySelector(".x-labels");
  const yLabelsG = svg.querySelector(".y-labels");

  /* ---------- DATA ---------- */

  const series = {
    total:  [120,140,160,180,200,230,260],
    active: [60,70,75,90,110,130,150],
    new:    [20,30,25,40,35,50,60]
  };

  const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const width  = svg.clientWidth || 600;
  const height = 260;

  const padding = { top:20, right:20, bottom:30, left:40 };

  const chartW = width  - padding.left - padding.right;
  const chartH = height - padding.top  - padding.bottom;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  /* ---------- CLEAR ---------- */

  gridG.innerHTML = "";
  linesG.innerHTML = "";
  xLabelsG.innerHTML = "";
  yLabelsG.innerHTML = "";

  /* ---------- SCALE ---------- */

  const allValues = Object.values(series).flat();
  const maxRaw = Math.max(...allValues);

  const magnitude = Math.pow(10, Math.floor(Math.log10(maxRaw)));
  const maxVal = Math.ceil(maxRaw / magnitude) * magnitude * 1.2;

  const stepX = chartW / (labels.length - 1);

  const scaleX = i => padding.left + i * stepX;

  const scaleY = v =>
    padding.top + chartH - (v / maxVal) * chartH;

  /* ---------- GRID ---------- */

  const ySteps = 4;

  for(let i=0;i<=ySteps;i++){

    const y = padding.top + (chartH / ySteps) * i;
    const value = Math.round(maxVal - (maxVal / ySteps) * i);

    const line = document.createElementNS("http://www.w3.org/2000/svg","line");

    line.setAttribute("x1", padding.left);
    line.setAttribute("x2", width - padding.right);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#eee");

    gridG.appendChild(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg","text");

    label.setAttribute("x", padding.left - 10);
    label.setAttribute("y", y + 4);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class","axis-text");

    label.textContent = value.toLocaleString();

    yLabelsG.appendChild(label);
  }

  /* ---------- X LABELS ---------- */

  labels.forEach((lab,i)=>{

    const x = scaleX(i);

    const text = document.createElementNS("http://www.w3.org/2000/svg","text");

    text.setAttribute("x", x);
    text.setAttribute("y", height - 8);
    text.setAttribute("text-anchor","middle");
    text.setAttribute("class","axis-text");

    text.textContent = lab;

    xLabelsG.appendChild(text);
  });

  /* ---------- PATH BUILDER ---------- */

  function buildPath(values){

    let d = "";

    values.forEach((v,i)=>{

      const x = scaleX(i);
      const y = scaleY(v);

      if(i === 0){
        d += `M ${x},${y}`;
      }else{
        const px = scaleX(i-1);
        const py = scaleY(values[i-1]);
        const cx = (px + x) / 2;
        d += ` C ${cx},${py} ${cx},${y} ${x},${y}`;
      }

    });

    return d;
  }

  /* ---------- DRAW + ANIMATE ---------- */

  const styles = {
    total:  { stroke:"#6C5CE7", width:3 },
    active: { stroke:"#00B894", width:2.5 },
    new:    { stroke:"#FD9644", width:2.5 }
  };

  Object.keys(series).forEach(key => {

    const path = document.createElementNS("http://www.w3.org/2000/svg","path");

    path.setAttribute("d", buildPath(series[key]));
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", styles[key].stroke);
    path.setAttribute("stroke-width", styles[key].width);
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("class", `line-path line-${key}`);

    linesG.appendChild(path);

    /* ---- animation ---- */

    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    path.style.transition = "stroke-dashoffset 0.2s ease";

    requestAnimationFrame(()=>{
      path.style.strokeDashoffset = "0";
    });

  });

}



drawUserGrowthChart();
CalledPremium();