CAREER NAVIGATOR — PROJECT SNAPSHOT v0.3
🎯 PROJECT TYPE

Offline deterministic career path system with game-like world visualization.

🧱 CORE ARCHITECTURE
ENGINE
Career Engine = deterministic data-driven system
Functions:
getCareerOptions()
getCareerSteps()
Source: static career_data.ts
FLOWS
flow_main.ts = single linear flow
User journey:
goal → options → selection → steps → result
WORLD SYSTEM (GAME LAYER)

Style: Monument Valley inspired world

Core concept:
vertical path (bottom → top)
each step = level in career progression
world = interactive game scene, not UI
Components:
VerticalPath (SVG glowing line)
LevelRenderer (platforms + status)
EnvironmentGenerator (left/right world)
WorldRenderer (composition layer)
FloatingOrb (current position)
WorldDebugMode (full scene view)
WORLD STRUCTURE
LEFT SIDE = training / education world (cyan theme)
RIGHT SIDE = industry / real world (purple theme)
CENTER = career path
DATA MAPPING

careerToWorld.ts:

5 career steps → 5 world levels
each level contains:
position index
visual theme
environment type
🎮 DEBUG MODE
WorldDebugMode enabled
shows full map at once
no camera movement
used for testing composition
⚙️ SYSTEM STATE (FRZ)
version: v0.3
mode: OFFLINE
AI runtime: FALSE
engine type: deterministic
status: STABLE BUILD
🔒 RULES
no AI in runtime
no dynamic generation
all logic deterministic
UI = visualization of static data
world = representation layer
🧭 CURRENT GOAL

Build playable MVP:

user can see full career world
user can move through levels
system visually represents career progression