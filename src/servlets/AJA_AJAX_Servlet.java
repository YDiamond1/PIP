package servlets;

import classes.Point;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AJA_AJAX_Servlet extends HttpServlet {

    @Override
    public void init(ServletConfig conf)throws ServletException  {
        super.init(conf);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException  {

        try {
            double x = Double.parseDouble(request.getParameter("X"));
            double y = Double.parseDouble(request.getParameter("Y"));
            double r = Double.parseDouble(request.getParameter("R"));
            boolean hit = Boolean.parseBoolean(request.getParameter("hit"));
            Point AJAXpoint = new Point(x,y,r);

            response.getWriter().println("{" +
                    "hit : " +AJAXpoint.isHit() +"," +
                    "}");
        }catch (Exception ex){
            response.getWriter().close();
        }

    }

}
