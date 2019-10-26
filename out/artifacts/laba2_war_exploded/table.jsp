<%--
  Created by IntelliJ IDEA.
  User: Пользователь
  Date: 25.10.2019
  Time: 12:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="classes.Point" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<html>
<head>
    <title>tableOFpoints</title>
    <link type="text/css" href="css/table.css" rel="stylesheet">
    <script src = "js/scripts.js"> </script>
</head>
<body>
<div class="container">

    <div class="table">
        <div class="row">
            <%
                List<Point> array =(ArrayList<Point>) session.getAttribute("Points");
                for(int i=array.size()-1;i>=array.size()-10; i--){
                    Point point = array.get(i);%>
            <div class="column"><%= i%></div>
            <div class="column"><%= point.getX()%></div>
            <div class="column"><%= point.getY()%></div>
            <div class="column"><%= point.getR()%></div>
            <div class="column"><%= point.isHit() ? "Попал" : "Не ПОПАЛ"%></div>
            <%
                }
            %>
        </div>
    </div>
</div>
</body>
</html>
