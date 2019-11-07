package servlets;

import classes.Point;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;

public class AreaCheckServlet extends HttpServlet {

    String template = "{ \"x\": %.4f%n, \"y\": %.4f%n, \"r\": %.4f%n, \"hit\":\"%s\"}";
    protected double x_Array[] = {-5,-4,-3,-2,-1,0,1,2,3};
    protected int r_Array[] = {1,2,3,4,5};
    protected boolean validate(double x, double y, int r){
        boolean checkX = Arrays.binarySearch(x_Array, x)>-1;
        boolean checkY = y<=5 && y>=-5;
        boolean checkR = Arrays.binarySearch(r_Array, r)>-1;
        return checkX && checkY && checkR;
    }
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            double x = Double.parseDouble(req.getParameter("X"));
            double y = Double.parseDouble(req.getParameter("Y"));
            int r = Integer.parseInt(req.getParameter("R"));
            Point point = null;
            if (!validate(x,y,r)){
                point = new Point(true);
            }
            else {
                point = new Point(x, y, r);
            }
            ((ArrayList<Point>) req.getSession().getAttribute("Points")).add(point);
            resp.addHeader("charset", "utf-8");
           resp.getWriter().print(String.format(Locale.ROOT,template, point.getX(), point.getY(), point.getR(), point.isHit() ? "HIT" : "MISS"));
        }catch (Exception ex){
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
        }
    }
}
