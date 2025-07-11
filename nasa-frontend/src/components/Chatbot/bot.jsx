import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ChatBot = ({ weatherData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your Mars assistant. Ask me about the latest sol weather data",
    },
  ]);
  const [chipSelect, setChipSelect] = useState();
  const [input, setInput] = useState("");

  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatSolReply = (sol) => {
    const solData = weatherData?.[sol];
    if (!solData) return `No data available for Sol ${sol}.`;

    return `Weather for Sol ${sol}:
    Temperature: ${solData.AT?.av ?? "N/A"} °C,
    Wind Speed: ${solData.HWS?.av ?? "N/A"} m/s,
    Pressure: ${solData.PRE?.av ?? "N/A"} Pa.`;
  };

  const handleClick = (item, index) => {
    setChipSelect(index);
    const newMessages = [
      ...messages,
      { from: "user", text: `Weather data in Sol ${item}` },
    ];
    newMessages.push({ from: "bot", text: formatSolReply(item) });
    setMessages(newMessages);
    setInput("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    const reply = getBotReply(input);
    newMessages.push({ from: "bot", text: reply });

    setMessages(newMessages);
    setInput("");
  };

  const getBotReply = (input) => {
    const latestSol = weatherData?.sol_keys?.slice(-1)[0];
    const solData = latestSol ? weatherData[latestSol] : null;
    const text = input.toLowerCase();
    setChipSelect("");
    if (text.includes("temperature")) {
      return solData?.AT?.av
        ? `Average temperature on latest Sol ${latestSol} is ${solData.AT.av} °C.`
        : "Sorry, no temperature data.";
    }

    if (text.includes("wind")) {
      return solData?.HWS?.av
        ? `Wind speed on Sol ${latestSol} is ${solData.HWS.av} m/s.`
        : "No wind data available.";
    }

    if (text.includes("pressure")) {
      return solData?.PRE?.av
        ? `Pressure is ${solData.PRE.av} Pa on Sol ${latestSol}.`
        : "Pressure data not found.";
    }
    if (text.includes("sol")) {
      return solData?.AT?.av
        ? `Latest Sol is ${latestSol}`
        : "Sorry, no sol data.";
    }

    return "Try asking about temperature, wind, or pressure!";
  };

  return (
    <>
      {/* Floating Button */}

      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          borderRadius: 10,
          background: "white",
          boxShadow: "0 0 15px 5px rgb(1, 1, 10)",
        }}
      >
        <IconButton
          color="primary"
          onClick={toggleChat}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <SmartToyIcon
            sx={{
              height: "2rem",
              width: "2rem",
              color: "rgb(173 92 17 / 78%)",
            }}
          />
        </IconButton>
      </Box>

      {/* Chat Popup */}
      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: { xs: "90vw", sm: 320 },
            height: { xs: "50vh", sm: 400 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h6">Mars Chat</Typography>
            <IconButton
              size="small"
              onClick={toggleChat}
              aria-label="Close chat window"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  my: 1.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor:
                      msg.from === "user" ? "#1976d2" : "#f1f1f1",
                    color: msg.from === "user" ? "#fff" : "#000",
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    display: "inline-block",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}

            {/*chip buttons*/}
            <Box
              sx={{
                backgroundColor: "#f1f1f1",
                color: "#000",
                borderRadius: 2,
                display: "inline-block",
                px: 1.5,
                py: 1.5,
              }}
            >
              <Typography variant="body2">
                Hi Choose any sol for know more about the weather data
              </Typography>
              <Stack
                direction="row"
                gap={1}
                flexWrap="wrap"
                sx={{ display: "inline-flex", marginTop: "4px" }}
              >
                {weatherData?.sol_keys.map((item, index) => (
                  <Chip
                    label={`Sol ${item}`}
                    key={index}
                    variant={index !== chipSelect ? "outlined" : "filled"}
                    onClick={() => {
                      handleClick(item, index);
                    }}
                  />
                ))}
              </Stack>
            </Box>
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              variant="contained"
              sx={{ background: "rgb(173 92 17 / 78%)" }}
              onClick={handleSend}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;
