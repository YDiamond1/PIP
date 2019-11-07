<%@ page import="java.util.ArrayList" %>
<%@ page import="classes.Point" %>
<%@ page import="java.util.Collection" %>
<%@ page import="java.util.Collections" %><%--
  Created by IntelliJ IDEA.
  User: YDiamond
  Date: 15.10.2019
  Time: 1:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>
<head>
    <title>LABA2</title>
    <meta content="text/html" charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="js/main.js"></script>
    <script scr="https://cdn.jsdelivr.net/npm/lax.js"></script>
</head>
<body onload="draw()">
<div class="head">
    <div class="name"> Вяткин Дмитрий</div>
    <div class="group"> Р3202</div>
    <div class="variant">20213</div>
</div>
<div class="container">

    <div class="main">
        <div class="graph">
            <canvas id = "canvas" width="400px" height="400px" style="background-image: url('images/graph.png')"></canvas>
        </div>
        <div class="form">
            <form id="coorForm" action="javascript:void(null)" onsubmit="sendForm(event);">
                <span id="r_span" style="display: none">Выберите радиус</span>
                <div class="X_coor">
                    <span class="caption_for">X:</span>
                    <button type="button" class="X_button" id="x-5" onclick="xChoose('-5')">-5</button>
                    <button type="button" class="X_button" id="x-4" onclick="xChoose('-4')">-4</button>
                    <button type="button" class="X_button" id="x-3" onclick="xChoose('-3')">-3</button>
                    <button type="button" class="X_button" id="x-2" onclick="xChoose('-2')">-2</button>
                    <button type="button" class="X_button" id="x-1" onclick="xChoose('-1')">-1</button>
                    <button type="button" class="X_button" id="x0" onclick="xChoose('0')">0</button>
                    <button type="button" class="X_button" id="x1" onclick="xChoose('1')">1</button>
                    <button type="button" class="X_button" id="x2" onclick="xChoose('2')">2</button>
                    <button type="button" class="X_button" id="x3" onclick="xChoose('3')">3</button>
                    <input type="hidden" name="X" id="X_field">
                </div>
                <div class="Y_coor">
                    <span class="caption_for">Y:</span>
                    <input type="text" name="Y" id="Y_field" oninput="yChoose()" placeholder="(-5..5)"
                           autocomplete="off">
                </div>
                <div class="R_coor">
                    <span class="caption_for">R:</span>
                    <button type="button" class="R_button" id="r1" onclick="rChoose('1')">1</button>
                    <button type="button" class="R_button" id="r2" onclick="rChoose('2')">2</button>
                    <button type="button" class="R_button" id="r3" onclick="rChoose('3')">3</button>
                    <button type="button" class="R_button" id="r4" onclick="rChoose('4')">4</button>
                    <button type="button" class="R_button" id="r5" onclick="rChoose('5')">5</button>
                    <input type="hidden" name="R" id="R_field">


                </div>
                <div style="display: none; width: 100%;" id="submit">
                    <input type="submit" name="">
                </div>
            </form>
        </div>
    </div>
        <div class="table" id="table">
            <div class="row caption">
                <div class="column">N</div>
                <div class="column">X</div>
                <div class="column">Y</div>
                <div class="column">R</div>
                <div class="column">Попадание</div>
            </div>
            <% ArrayList<Point> arrayList = (ArrayList<Point>) session.getAttribute("Points");
                ArrayList<Point> reversed = new ArrayList<>(arrayList);
                int i=1;
                Collections.reverse(reversed);
                for(Point point : reversed){
            %>
            <div class ="row">
                <div class="column"><%=(i++)%></div>
                <div class="column"><%=point.getX()%></div>
                <div class="column"><%=point.getY()%></div>
                <div class="column"><%=point.getR()%></div>
                <div class="column"><%=point.isHit()? "HIT" : "MISS"%></div>
            </div>
            <%
               }
            %>
        </div>

</div>
</body>
</html>
