import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  IconButton,
  Button,
  Avatar,
  Chip,
  Divider,
  Badge,
  useTheme,
  alpha,
  Tooltip,
  Fade,
  Slide,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import TerminalIcon from "@mui/icons-material/Terminal";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const drawerWidth = 280;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    color: "#6366F1",
    notifications: 0,
  },
  {
    text: "Active Tests",
    icon: <TerminalIcon />,
    path: "/coding-test",
    color: "#10B981",
    notifications: 3,
  },
  {
    text: "Test Builder",
    icon: <QuizIcon />,
    path: "/q-setter",
    color: "#F59E0B",
    notifications: 0,
  },
  {
    text: "Analytics",
    icon: <BarChartIcon />,
    path: "/reports",
    color: "#EF4444",
    notifications: 0,
  },
  {
    text: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/orders",
    color: "#8B5CF6",
    notifications: 2,
  },
  {
    text: "Integrations",
    icon: <LayersIcon />,
    path: "/integrations",
    color: "#06B6D4",
    notifications: 0,
  },
];

export default function MainDesign() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Premium gradient backgrounds
  const gradientBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const cardGradient = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
  const sidebarGradient =
    "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: sidebarGradient,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, textAlign: "center", position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            "& .logo-icon": {
              background: cardGradient,
              borderRadius: "12px",
              p: 1,
              mr: 2,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            },
          }}
        >
          <Box className="logo-icon">
            <CodeIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(45deg, #fff 30%, #e0e7ff 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            CodeJudge
          </Typography>
        </Box>
        <Chip
          label="Enterprise Edition"
          size="small"
          sx={{
            background: "linear-gradient(45deg, #FFD700 30%, #FFA500 90%)",
            color: "#1a1a2e",
            fontWeight: "bold",
            fontSize: "10px",
            boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
          }}
        />
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mx: 2, mb: 2 }} />

      {/* Navigation Items */}
      <List sx={{ px: 2, position: "relative", zIndex: 1 }}>
        {menuItems.map((item, index) => (
          <Fade in={true} timeout={300 + index * 100} key={item.text}>
            <Tooltip title={item.text} placement="right" arrow>
              <ListItem
                button
                component={Link}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.text)}
                onMouseLeave={() => setHoveredItem(null)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                  backdropFilter:
                    location.pathname === item.path ? "blur(10px)" : "none",
                  border:
                    location.pathname === item.path
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid transparent",
                  transform:
                    hoveredItem === item.text
                      ? "translateX(8px) scale(1.02)"
                      : "translateX(0) scale(1)",
                  boxShadow:
                    location.pathname === item.path
                      ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : hoveredItem === item.text
                      ? "0 4px 20px rgba(0,0,0,0.2)"
                      : "none",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      location.pathname === item.path
                        ? `linear-gradient(135deg, ${alpha(
                            item.color,
                            0.3
                          )} 0%, ${alpha(item.color, 0.1)} 100%)`
                        : "transparent",
                    transition: "all 0.3s ease",
                  },
                  "&:hover::before": {
                    background: `linear-gradient(135deg, ${alpha(
                      item.color,
                      0.2
                    )} 0%, ${alpha(item.color, 0.05)} 100%)`,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "#ffffff"
                        : "rgba(255,255,255,0.7)",
                    minWidth: 48,
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    transform:
                      hoveredItem === item.text ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <Badge
                    badgeContent={item.notifications}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "10px",
                        height: "16px",
                        minWidth: "16px",
                        background: cardGradient,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    {item.icon}
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    color:
                      location.pathname === item.path
                        ? "#ffffff"
                        : "rgba(255,255,255,0.9)",
                    fontSize: "14px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                {location.pathname === item.path && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 12,
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: cardGradient,
                      boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          </Fade>
        ))}
      </List>

      {/* User Profile Section */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              mr: 2,
              background: cardGradient,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          >
            {user?.name?.charAt(0) || "A"}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: "12px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {user?.name || "Admin User"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "10px",
              }}
            >
              Super Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}
    >
      <CssBaseline />

      {/* Premium App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "0 1px 30px rgba(0,0,0,0.04)",
        }}
      >
        <Toolbar sx={{ minHeight: "70px !important" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#1a1a2e",
              "&:hover": {
                background: "rgba(0,0,0,0.04)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "24px",
              }}
            >
              Enterprise Dashboard
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(0,0,0,0.6)", fontSize: "12px", mt: -0.5 }}
            >
              Advanced Coding Assessment Platform
            </Typography>
          </Box>

          {/* Premium Header Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="System Status">
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: "16px !important" }} />}
                label="All Systems Operational"
                size="small"
                sx={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "11px",
                  "& .MuiChip-icon": { color: "white" },
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                }}
              />
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                sx={{
                  color: "#64748b",
                  "&:hover": {
                    background: "rgba(0,0,0,0.04)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Badge badgeContent={5} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton
                sx={{
                  color: "#64748b",
                  "&:hover": {
                    background: "rgba(0,0,0,0.04)",
                    transform: "rotate(90deg)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, borderColor: "rgba(0,0,0,0.1)" }}
            />

            {user?.name && (
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    background: gradientBg,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Typography
                  sx={{
                    color: "#1a1a2e",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
            )}

            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              startIcon={<LogoutIcon />}
              sx={{
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#EF4444",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "none",
                px: 2,
                py: 1,
                "&:hover": {
                  borderColor: "#EF4444",
                  background: "rgba(239, 68, 68, 0.04)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Premium Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxShadow: "0 0 50px rgba(0,0,0,0.3)",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxShadow: "4px 0 30px rgba(0,0,0,0.1)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Premium Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          minHeight: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Toolbar sx={{ minHeight: "70px !important" }} />
        <Slide direction="up" in={true} timeout={500}>
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Outlet />
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}
