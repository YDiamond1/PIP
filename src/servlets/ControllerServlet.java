package servlets;

import classes.Point;

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.http.*;


public class ControllerServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        String x = request.getParameter("X");
        String y = request.getParameter("Y");
        String r = request.getParameter("R");
        String hit = request.getParameter("hit");
        if(request.getSession().getAttribute("Points")==null){
            request.getSession().setAttribute("Points", new ArrayList<Point>());
        }


        if (x == null && y == null && r == null) {
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
        }
        else{
            if (hit != null) {
                request.getServletContext().getRequestDispatcher("/AJAX").forward(request,response);
            } else {
                request.getServletContext().getRequestDispatcher("/check").forward(request,response);
            }
        }
    }
}
