package servlets;

import java.io.IOException;
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

        if (x == null && y == null && r == null) {
            if (hit != null) {
                request.getServletContext().getRequestDispatcher("/AJAX");
            } else {
                request.getServletContext().getRequestDispatcher("/check");
            }

        }
    }
}
