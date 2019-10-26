package servlets;

import classes.Point;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspApplicationContext;
import java.io.IOException;
import java.util.ArrayList;

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
            int r = Integer.parseInt(request.getParameter("R"));
            boolean hit = Boolean.parseBoolean(request.getParameter("hit"));
            Point AJAXpoint = new Point(x,y,r);
            ((ArrayList<Point>)request.getSession().getAttribute("Points")).add(AJAXpoint);
            response.getWriter().println("{" +
                    "hit : " +AJAXpoint.isHit() +"," +
                    "}");
        }catch (Exception ex){
            response.getWriter().close();
        }

    }

}
