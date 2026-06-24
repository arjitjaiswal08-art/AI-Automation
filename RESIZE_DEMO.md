# AI Unica - Resize Feature Demo

## 🎬 Interactive Panel Resizing

Experience professional panel resizing in AI Unica!

---

## 🎯 Quick Demo

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│                        AI Unica                             │
├────────┬────────┬──────────────────────────┬────────────────┤
│        ║        ║                          ║                │
│ SIDEBAR║  FILE  ║       CODE EDITOR        ║   CHAT PANEL   │
│  256px ║EXPLORER║                          ║     384px      │
│        ║ 256px  ║                          ║                │
│  💻    ║  📁    ║  def hello():            ║  🤖 AI Chat    │
│  📁    ║  src/  ║      print("Hello")      ║                │
│  🕒    ║  main  ║                          ║  Type here...  │
│  ⚙️    ║  utils ║                          ║                │
│        ║        ║                          ║  [Send]        │
│        ║        ║══════════════════════════║                │
│        ║        ║     TERMINAL (300px)     ║                │
│        ║        ║  $ python main.py        ║                │
└────────┴────────┴──────────────────────────┴────────────────┘
         ↕        ↕                          ↕
      RESIZE   RESIZE                     RESIZE
      HANDLE   HANDLE                     HANDLE
```

**Legend:**
- `║` = Resize handle (hover to see blue indicator)
- `═` = Horizontal resize handle (for terminal)

---

## 📐 Resize Handles Location

### 1. **Sidebar Resize** (Right Edge)
```
┌──────────┐║
│          │║← Blue line appears here on hover
│ SIDEBAR  │║   Drag left/right
│          │║
│          │║   Min: 200px | Max: 400px
└──────────┘║
```

### 2. **Chat Panel Resize** (Left Edge)
```
            ║┌──────────┐
Blue line →║│   CHAT   │
appears here║│  PANEL   │
on hover    ║│          │
            ║│          │
            ║└──────────┘
```

### 3. **File Explorer Resize** (Right Edge)
```
┌──────────┐║
│   FILE   │║← Drag to adjust
│ EXPLORER │║   file tree width
│          │║
└──────────┘║
```

### 4. **Terminal Resize** (Top Edge)
```
═══════════════  ← Blue line appears here
┌─────────────┐
│  TERMINAL   │  Drag up/down
│  $ ls       │
└─────────────┘
```

---

## 🎨 Visual States

### State 1: Default (No Hover)
```
Panel edges are invisible
Clean interface
No visual clutter
```

### State 2: Hover
```
Blue indicator appears (1px → visible)
Rounded pill shape
Shadow effect
Cursor changes to resize arrow
```

### State 3: Dragging
```
Cursor locked to resize mode
Blue line visible
Panel size updates in real-time
Text selection disabled
```

### State 4: Released
```
New size is set
Cursor returns to normal
Blue indicator fades out
```

---

## 🎬 Step-by-Step Examples

### Example 1: Making Chat Panel Wider

**Step 1:** Current state
```
Editor (wide) | Chat (384px, feels small)
```

**Step 2:** Hover left edge of chat
```
Editor (wide) | ║ Chat (384px)
                ↑ Blue indicator appears
```

**Step 3:** Click and drag left
```
Editor (medium) |←─→| Chat (500px)
                  Dragging...
```

**Step 4:** Release
```
Editor (medium) | Chat (500px) ✓
More space for AI responses!
```

---

### Example 2: Expanding Terminal

**Step 1:** Current state
```
Editor
─────────
Terminal (300px)
```

**Step 2:** Hover top edge
```
Editor
═════════  ← Blue indicator
Terminal (300px)
```

**Step 3:** Drag upward
```
Editor (smaller)
═════════
Terminal (450px)
```

**Step 4:** Result
```
More terminal space for output!
```

---

## 💡 Common Use Cases

### Use Case 1: Focus on Code
**Goal:** Maximize editor space

1. Shrink sidebar to 200px
2. Shrink file explorer to 150px
3. Shrink chat to 300px
4. **Result:** Maximum code visibility

```
┌────┬───┬────────────────────────────┬─────┐
│ S  │ F │        CODE (LARGE)        │  C  │
│ 200│150│                            │ 300 │
└────┴───┴────────────────────────────┴─────┘
```

### Use Case 2: AI Interaction Mode
**Goal:** Focus on AI chat

1. Shrink sidebar to 200px
2. Shrink file explorer to 150px
3. Expand chat to 550px
4. **Result:** More space for AI responses

```
┌────┬───┬──────────────┬──────────────────┐
│ S  │ F │     CODE     │   CHAT (LARGE)   │
│ 200│150│              │       550        │
└────┴───┴──────────────┴──────────────────┘
```

### Use Case 3: Debugging Mode
**Goal:** See logs and code

1. Keep sidebar at 220px
2. Keep file explorer at 200px
3. Expand terminal to 450px
4. **Result:** Better debugging view

```
┌─────┬────┬───────────────────┐
│  S  │ F  │      CODE         │
│ 220 │200 │                   │
├─────┴────┴═══════════════════┤
│     TERMINAL (450px)          │
│     Long error logs visible   │
└───────────────────────────────┘
```

---

## 🎯 Resize Ranges

### Visual Size Comparison

#### Sidebar Widths
```
200px: ┌────┐   Minimum (compact)
       │ S  │
       └────┘

256px: ┌────────┐   Default (balanced)
       │ SIDEBAR│
       └────────┘

400px: ┌──────────────┐   Maximum (spacious)
       │   SIDEBAR    │
       └──────────────┘
```

#### Chat Panel Widths
```
300px: ┌──────┐   Minimum
       │ CHAT │
       └──────┘

384px: ┌──────────┐   Default
       │   CHAT   │
       └──────────┘

600px: ┌────────────────────┐   Maximum
       │     CHAT PANEL     │
       └────────────────────┘
```

#### Terminal Heights
```
150px: ┌─────────┐   Minimum (2-3 lines)
       │ TERMINAL│
       └─────────┘

300px: ┌─────────┐   Default (10-12 lines)
       │         │
       │TERMINAL │
       │         │
       └─────────┘

600px: ┌─────────┐   Maximum (25-30 lines)
       │         │
       │         │
       │TERMINAL │
       │         │
       │         │
       └─────────┘
```

---

## 🎨 Color Scheme

### Resize Indicator Colors
```css
Default:    Invisible (opacity: 0)
Hover:      Blue (#3B82F6) with opacity fade-in
Active:     Blue (#3B82F6) solid
Shadow:     Blue glow (shadow-lg)
```

### Visual Appearance
```
Before Hover:  [         ]  (invisible)
After Hover:   [    |    ]  (blue line)
                    ↑
              Blue indicator
              with shadow
```

---

## ⌨️ Keyboard Support (Coming Soon)

### Planned Shortcuts
```
Ctrl/Cmd + ]       Increase sidebar width
Ctrl/Cmd + [       Decrease sidebar width
Ctrl/Cmd + Shift + ]   Increase chat width
Ctrl/Cmd + Shift + [   Decrease chat width
Ctrl/Cmd + =       Increase terminal height
Ctrl/Cmd + -       Decrease terminal height
Ctrl/Cmd + 0       Reset all to default
```

---

## 📱 Touch Support (Future)

### Mobile Gestures (Planned)
```
Swipe left:   Collapse sidebar
Swipe right:  Expand sidebar
Swipe up:     Expand terminal
Swipe down:   Collapse terminal
Pinch:        Adjust multiple panels
```

---

## 🔧 Developer Info

### CSS Classes Applied
```tsx
// Resize handle
className="absolute top-0 right-0 w-1 h-full 
           cursor-ew-resize 
           hover:bg-blue-500 
           transition-colors 
           group"

// Visual indicator
className="w-1 h-12 
           bg-blue-500 
           rounded-full 
           shadow-lg 
           opacity-0 
           group-hover:opacity-100"
```

### Dynamic Styles
```tsx
// Panel width (horizontal)
style={{ width: `${sidebarWidth}px` }}

// Panel height (vertical)
style={{ height: `${terminalHeight}px` }}

// Editor with terminal
style={{ 
  height: showTerminal 
    ? `calc(100% - ${terminalHeight}px)` 
    : '100%' 
}}
```

---

## ✅ Quick Test

Try these to test the feature:

1. **Hover Test**
   - Move mouse to panel edges
   - See blue indicators appear
   - Cursor should change

2. **Drag Test**
   - Click and drag resize handle
   - Panel should resize smoothly
   - No text should be selected

3. **Constraint Test**
   - Try dragging beyond limits
   - Should stop at min/max
   - Panel stays within bounds

4. **Release Test**
   - Release mouse button
   - Size should be set
   - Cursor returns to normal

---

## 🎉 Result

**Professional panel resizing** with:
- ✅ Smooth drag experience
- ✅ Visual feedback on hover
- ✅ Smart size constraints
- ✅ Clean, modern design
- ✅ Zero performance issues

### Try it now:
1. Start the application
2. Hover over any panel edge
3. Drag to resize
4. Enjoy your custom workspace!

---

**AI Unica** - Professional AI Development Platform
Resize Demo Guide v1.0

Last Updated: 2026-06-23
