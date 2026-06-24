# AI Unica - Quick Reference Guide

Quick copy-paste reference for standardized components in AI Unica.

---

## 🎨 Buttons

### Primary Button (Standard - 40px)
```tsx
<button className="h-10 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95">
  Primary Action
</button>
```

### Primary Button (Large - 44px)
```tsx
<button className="h-11 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95">
  Large Action
</button>
```

### Secondary Button
```tsx
<button className="h-10 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg font-medium transition-all border border-gray-600">
  Secondary Action
</button>
```

### Small Button (36px)
```tsx
<button className="h-9 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs rounded-lg font-medium transition-all border border-gray-600">
  Small Button
</button>
```

### Button with Loading State
```tsx
<button 
  disabled={loading}
  className="h-11 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium transition-all shadow-lg disabled:opacity-50"
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Loading...
    </span>
  ) : (
    'Submit'
  )}
</button>
```

---

## 📝 Form Inputs

### Text Input (Standard - 40px)
```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-white block">
    Field Label
  </label>
  <input
    type="text"
    placeholder="Enter value..."
    className="w-full h-10 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  />
  <p className="text-xs text-gray-500">Optional help text</p>
</div>
```

### Textarea
```tsx
<textarea
  placeholder="Enter text..."
  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
  rows={3}
/>
```

### Select Dropdown
```tsx
<select className="w-full h-10 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
```

---

## 🔘 Toggle Switch

```tsx
<button
  onClick={() => setEnabled(!enabled)}
  className={`relative w-12 h-6 rounded-full transition-all shadow-inner ${
    enabled ? 'bg-blue-600' : 'bg-gray-700'
  }`}
>
  <span
    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
      enabled ? 'right-0.5' : 'left-0.5'
    }`}
  />
</button>
```

---

## 📦 Cards

### Standard Card
```tsx
<div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
  <h3 className="text-lg font-semibold text-white mb-4">Card Title</h3>
  <p className="text-sm text-gray-400">Card content goes here</p>
</div>
```

### Card Section with Divider
```tsx
<div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
  <h3 className="text-lg font-semibold text-white mb-6">Section Title</h3>
  
  <div className="space-y-6">
    <div>Content 1</div>
    
    <div className="pt-6 border-t border-gray-700">
      Content 2
    </div>
    
    <div className="pt-6 border-t border-gray-700">
      Content 3
    </div>
  </div>
</div>
```

---

## 💬 Messages

### Success Message
```tsx
<div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
  <p className="text-green-400 text-sm font-medium">Success message here</p>
</div>
```

### Error Message
```tsx
<div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3">
  <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
  <p className="text-red-400 text-sm font-medium">Error message here</p>
</div>
```

### Info Message
```tsx
<div className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg flex items-center gap-3">
  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <p className="text-blue-400 text-sm font-medium">Info message here</p>
</div>
```

---

## 🎯 Navigation

### Navigation Button (Active)
```tsx
<button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all">
  <span className="text-lg">💻</span>
  <span>Active Item</span>
</button>
```

### Navigation Button (Inactive)
```tsx
<button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
  <span className="text-lg">📁</span>
  <span>Inactive Item</span>
</button>
```

---

## 📊 Page Layout

### Standard Page with Header
```tsx
<div className="flex-1 bg-gray-900 overflow-y-auto">
  {/* Sticky Header */}
  <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
    <div className="max-w-4xl mx-auto px-6 py-5">
      <h1 className="text-2xl font-bold text-white mb-1">Page Title</h1>
      <p className="text-sm text-gray-400">Page description</p>
    </div>
  </div>

  {/* Content */}
  <div className="max-w-4xl mx-auto px-6 py-6">
    {/* Your content here */}
  </div>
</div>
```

---

## 🎨 Gradients

### Button Gradient
```
bg-gradient-to-r from-blue-600 to-blue-500
hover:from-blue-700 hover:to-blue-600
```

### Background Gradient
```
bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
```

### Header Gradient
```
bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600
```

---

## 🌟 Shadows

### Standard Shadow
```
shadow-lg
```

### Enhanced Shadow
```
shadow-xl
```

### Colored Shadow
```
shadow-lg shadow-blue-500/30
```

### Hover Shadow
```
hover:shadow-xl hover:shadow-blue-500/40
```

---

## 🎯 Status Indicators

### Online Status
```tsx
<span className="flex items-center gap-2 text-sm text-green-400 font-medium">
  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
  Online
</span>
```

### Offline Status
```tsx
<span className="flex items-center gap-2 text-sm text-gray-400 font-medium">
  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
  Offline
</span>
```

---

## 🔧 Range Slider

```tsx
<div>
  <div className="flex items-center justify-between mb-3">
    <label className="text-sm font-medium text-white">Label</label>
    <span className="text-sm font-mono text-blue-400">{value}px</span>
  </div>
  <input
    type="range"
    min="12"
    max="24"
    value={value}
    onChange={(e) => setValue(Number(e.target.value))}
    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
  />
  <div className="flex justify-between text-xs text-gray-500 mt-1">
    <span>12px</span>
    <span>24px</span>
  </div>
</div>
```

---

## 🎨 Colors Reference

```
Primary Blue:       #3B82F6  (bg-blue-600)
Primary Hover:      #2563EB  (bg-blue-700)
Secondary Purple:   #8B5CF6  (bg-purple-600)
Success Green:      #10B981  (bg-green-500)
Error Red:          #EF4444  (bg-red-500)

Background Dark:    #0F172A  (bg-gray-900)
Background Light:   #1E293B  (bg-gray-800)
Border:             #374151  (border-gray-700)

Text White:         #F8FAFC  (text-white)
Text Gray:          #94A3B8  (text-gray-400)
Text Muted:         #64748B  (text-gray-500)
```

---

## 📏 Spacing Scale

```
p-1     4px
p-2     8px
p-3     12px
p-4     16px
p-5     20px
p-6     24px
p-8     32px
p-10    40px
p-12    48px
```

---

## ⚡ Transitions

### Standard Transition
```
transition-all
```

### Duration
```
duration-150   (fast)
duration-200   (normal)
duration-300   (slow)
```

---

**AI Unica** - Professional AI Development Platform
Quick Reference v1.0
