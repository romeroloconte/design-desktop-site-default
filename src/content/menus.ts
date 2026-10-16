import type { IconType } from 'react-icons';
import {
  LuAppWindow, LuArchive, LuArrowDownAZ, LuArrowUpDown, LuArrowUpToLine, LuBookOpen, LuCalendar, LuChevronLeft, LuChevronRight,
  LuCircleArrowDown, LuClipboard, LuClipboardPaste, LuClock, LuCloud, LuColumns2, LuColumns3, LuCopy, LuCopyPlus, LuCornerUpRight,
  LuCreditCard, LuEye, LuFileText, LuFileUser, LuFolderClock, LuFolderCog, LuFolderInput, LuFolderOpen, LuFolderPlus, LuFolderSearch,
  LuGalleryHorizontal, LuGalleryVertical, LuGlobe, LuGrid2X2, LuGrid3X3, LuHammer, LuHardDrive, LuHouse, LuInfo, LuKeyRound,
  LuLaptop, LuLayers, LuLayoutDashboard, LuLayoutGrid, LuLightbulb, LuList, LuListChecks, LuMapPin, LuMaximize, LuMic, LuMonitor,
  LuPanelBottom, LuPanelLeft, LuPanelRight, LuPanelTop, LuPencil, LuPencilRuler, LuPenLine, LuPrinter, LuRadio, LuRows2, LuRuler,
  LuScan, LuScissors, LuSearch, LuServer, LuSettings, LuShare, LuSmile, LuSparkles, LuSquare, LuSquareArrowOutUpRight,
  LuSquareChevronLeft, LuSquareChevronRight, LuSquareDot, LuSquareMinus, LuSquareSplitHorizontal, LuSquareStack, LuTable, LuTag,
  LuTextCursorInput, LuTextQuote, LuTextSelect, LuTrash2, LuUndo2, LuRedo2, LuUsers, LuWrench, LuX,
} from 'react-icons/lu';

/**
 * Finder menus (prototype): mostly decorative. Items with an `action` run the handler of the same
 * name passed to the menu, and show as disabled while that handler is missing.
 * Shortcut tokens: `{globe}` and `{mic}` render as inline glyphs.
 */
export type MenuEntry =
  | { type: 'sep' }
  | { type: 'tags' }
  | {
      type?: 'item';
      label: string;
      icon?: IconType;
      shortcut?: string;
      disabled?: boolean;
      checked?: boolean;
      submenu?: MenuEntry[];
      /** Muted trailing text (used by Help › Search results). */
      hint?: string;
      action?: MenuAction;
    };

/** Finder's colour tags, in menu order. */
export const finderTags = [
  { id: 'red', name: 'Red', color: '#ff5f57' },
  { id: 'orange', name: 'Orange', color: '#ff9f0a' },
  { id: 'yellow', name: 'Yellow', color: '#ffd60a' },
  { id: 'green', name: 'Green', color: '#32d74b' },
  { id: 'blue', name: 'Blue', color: '#0a84ff' },
  { id: 'purple', name: 'Purple', color: '#bf5af2' },
  { id: 'gray', name: 'Gray', color: '#98989d' },
] as const;

export type MenuAction = 'open' | 'getInfo' | 'quickLook' | 'cleanUp' | 'appearance';

export type Menu = { title: string; items: MenuEntry[]; search?: boolean };

const sep = { type: 'sep' } as const;

export const finderMenus: Menu[] = [
  {
    title: 'File',
    items: [
      { label: 'New Finder Window', icon: LuAppWindow, shortcut: '⌘N' },
      { label: 'New Folder', icon: LuFolderPlus, shortcut: '⇧⌘N' },
      { label: 'New Folder with Selection', shortcut: '⌃⌘N', disabled: true },
      { label: 'New Smart Folder', icon: LuFolderCog },
      { label: 'New Tab', icon: LuCopyPlus, shortcut: '⌘T' },
      { label: 'Open', icon: LuSquareArrowOutUpRight, shortcut: '⌘O', action: 'open' },
      { label: 'Open With', disabled: true, submenu: [] },
      { label: 'Close Window', icon: LuX, shortcut: '⌘W', disabled: true },
      sep,
      { label: 'Get Info', icon: LuInfo, shortcut: '⌘I', action: 'getInfo' },
      { label: 'Rename', icon: LuPencil, disabled: true },
      { label: 'Compress', icon: LuArchive, disabled: true },
      { label: 'Duplicate', icon: LuCopy, shortcut: '⌘D', disabled: true },
      { label: 'Make Alias', icon: LuCornerUpRight, shortcut: '⌃⌘A', disabled: true },
      { label: 'Quick Look', icon: LuEye, shortcut: 'Space', action: 'quickLook' },
      { label: 'Print', icon: LuPrinter, shortcut: '⌘P', disabled: true },
      sep,
      { label: 'Share…', icon: LuShare, disabled: true },
      { label: 'Manage Shared Folder…', icon: LuUsers, disabled: true },
      sep,
      { label: 'Show Original', icon: LuFolderSearch, shortcut: '⌘R', disabled: true },
      { label: 'Add to Dock', icon: LuPanelBottom, shortcut: '⌃⇧⌘T', disabled: true },
      sep,
      { label: 'Move to Trash', icon: LuTrash2, shortcut: '⌘⌫', disabled: true },
      { label: 'Eject', icon: LuArrowUpToLine, shortcut: '⌘E', disabled: true },
      sep,
      { type: 'tags' },
      { label: 'Tags…', icon: LuTag, disabled: true },
      sep,
      { label: 'Find', icon: LuSearch, shortcut: '⌘F' },
    ],
  },
  {
    title: 'Edit',
    items: [
      { label: 'Undo Rename', icon: LuUndo2, shortcut: '⌘Z' },
      { label: 'Redo', icon: LuRedo2, shortcut: '⇧⌘Z', disabled: true },
      sep,
      { label: 'Cut', icon: LuScissors, shortcut: '⌘X', disabled: true },
      { label: 'Copy', icon: LuCopy, shortcut: '⌘C', disabled: true },
      { label: 'Paste', icon: LuClipboardPaste, shortcut: '⌘V', disabled: true },
      { label: 'Select All', icon: LuTextSelect, shortcut: '⌘A' },
      sep,
      { label: 'Show Clipboard', icon: LuClipboard },
      sep,
      {
        label: 'Writing Tools',
        icon: LuPenLine,
        submenu: [
          { label: 'Show Writing Tools', icon: LuSparkles },
          sep,
          { label: 'Proofread', icon: LuListChecks, disabled: true },
          { label: 'Rewrite', icon: LuPencil, disabled: true },
          { label: 'Summary', icon: LuTextQuote, disabled: true },
          { label: 'Table', icon: LuTable, disabled: true },
        ],
      },
      {
        label: 'AutoFill',
        icon: LuTextCursorInput,
        submenu: [
          { label: 'Contact…', icon: LuFileUser },
          { label: 'Passwords…', icon: LuKeyRound },
          { label: 'Credit Cards…', icon: LuCreditCard },
          { label: 'Location', icon: LuMapPin },
        ],
      },
      { label: 'Start Dictation…', icon: LuMic, shortcut: '{mic}' },
      { label: 'Emoji & Symbols', icon: LuSmile, shortcut: '{globe}' },
    ],
  },
  {
    title: 'View',
    items: [
      { label: 'as Icons', icon: LuLayoutGrid, shortcut: '⌘1', checked: true, disabled: true },
      { label: 'as List', icon: LuList, shortcut: '⌘2', disabled: true },
      { label: 'as Columns', icon: LuColumns3, shortcut: '⌘3', disabled: true },
      { label: 'as Gallery', icon: LuGalleryHorizontal, shortcut: '⌘4', disabled: true },
      sep,
      { label: 'Use Groups', icon: LuLayoutDashboard, shortcut: '⌃⌘0' },
      {
        label: 'Sort By',
        icon: LuArrowUpDown,
        submenu: [
          { label: 'None', checked: true },
          sep,
          { label: 'Name', icon: LuArrowDownAZ },
          { label: 'Kind', icon: LuFileText },
          { label: 'Date Last Opened', icon: LuClock },
          { label: 'Date Created', icon: LuCalendar },
          { label: 'Size', icon: LuRuler },
          { label: 'Tags', icon: LuTag },
        ],
      },
      { label: 'Clean Up', icon: LuGrid3X3, action: 'cleanUp' },
      {
        label: 'Clean Up By',
        submenu: [
          { label: 'Name' },
          { label: 'Kind' },
          { label: 'Date Modified' },
          { label: 'Size' },
          { label: 'Tags' },
        ],
      },
      sep,
      { label: 'Show Tab Bar', shortcut: '⇧⌘T', disabled: true },
      { label: 'Show All Tabs', shortcut: '⇧⌘\\', disabled: true },
      sep,
      { label: 'Show Sidebar', icon: LuPanelLeft, shortcut: '⌃⌘S', disabled: true },
      { label: 'Show Preview', icon: LuPanelRight, shortcut: '⇧⌘P', disabled: true },
      sep,
      { label: 'Show Toolbar', shortcut: '⌥⌘T', disabled: true },
      { label: 'Show Path Bar', shortcut: '⌥⌘P', disabled: true },
      { label: 'Show Status Bar', shortcut: '⌘/', disabled: true },
      sep,
      { label: 'Customize Toolbar…', icon: LuWrench, disabled: true },
      sep,
      { label: 'Show View Options', icon: LuSettings, shortcut: '⌘J' },
      { label: 'Show Preview Options', disabled: true },
      sep,
      { label: 'Enter Full Screen', icon: LuMaximize, shortcut: '{globe}F', disabled: true },
    ],
  },
  {
    title: 'Go',
    items: [
      { label: 'Back', icon: LuChevronLeft, shortcut: '⌘[', disabled: true },
      { label: 'Forward', icon: LuChevronRight, shortcut: '⌘]', disabled: true },
      { label: 'Select Startup Disk', icon: LuHardDrive, shortcut: '⇧⌘↑' },
      sep,
      { label: 'Recents', icon: LuClock, shortcut: '⇧⌘F' },
      { label: 'Documents', icon: LuFileText, shortcut: '⇧⌘O' },
      { label: 'Desktop', icon: LuMonitor, shortcut: '⇧⌘D' },
      { label: 'Downloads', icon: LuCircleArrowDown, shortcut: '⌥⌘L' },
      { label: 'Home', icon: LuHouse, shortcut: '⇧⌘H' },
      { label: 'Computer', icon: LuLaptop, shortcut: '⇧⌘C' },
      { label: 'AirDrop', icon: LuRadio, shortcut: '⇧⌘R' },
      { label: 'Network', icon: LuGlobe, shortcut: '⇧⌘K' },
      { label: 'iCloud Drive', icon: LuCloud, shortcut: '⇧⌘I' },
      { label: 'Shared', icon: LuFolderOpen, shortcut: '⇧⌘S' },
      { label: 'Applications', icon: LuPencilRuler, shortcut: '⇧⌘A' },
      { label: 'Utilities', icon: LuHammer, shortcut: '⇧⌘U' },
      sep,
      {
        label: 'Recent Folders',
        icon: LuFolderClock,
        submenu: [
          { label: 'Projects' },
          { label: 'Portfolio' },
          { label: 'Downloads' },
          sep,
          { label: 'Clear Menu' },
        ],
      },
      sep,
      { label: 'Go to Folder…', icon: LuFolderInput, shortcut: '⇧⌘G' },
      { label: 'Connect to Server…', icon: LuServer, shortcut: '⌘K' },
    ],
  },
  {
    title: 'Window',
    items: [
      { label: 'Minimize', icon: LuSquareMinus, shortcut: '⌘M', disabled: true },
      { label: 'Zoom', icon: LuScan, disabled: true },
      { label: 'Fill', icon: LuSquare, shortcut: '⌃{globe}F', disabled: true },
      { label: 'Center', icon: LuSquareDot, shortcut: '⌃{globe}C', disabled: true },
      sep,
      {
        label: 'Move & Resize',
        icon: LuSquareSplitHorizontal,
        submenu: [
          { label: 'Left', icon: LuPanelLeft, shortcut: '⌃{globe}←' },
          { label: 'Right', icon: LuPanelRight, shortcut: '⌃{globe}→' },
          { label: 'Top', icon: LuPanelTop, shortcut: '⌃{globe}↑' },
          { label: 'Bottom', icon: LuPanelBottom, shortcut: '⌃{globe}↓' },
          sep,
          { label: 'Quarters', icon: LuGrid2X2 },
          { label: 'Left & Right', icon: LuColumns2 },
          { label: 'Top & Bottom', icon: LuRows2 },
          sep,
          { label: 'Return to Previous Size', icon: LuSquare, shortcut: '⌃{globe}R' },
        ],
      },
      { label: 'Full Screen Tile', icon: LuPanelLeft, disabled: true, submenu: [] },
      sep,
      { label: 'Remove Window from Set', icon: LuGalleryVertical, disabled: true },
      { label: 'Cycle Through Windows', icon: LuSquareStack, shortcut: '⌘`' },
      { label: 'Show Progress Window', disabled: true },
      sep,
      { label: 'Bring All to Front', icon: LuLayers },
      sep,
      { label: 'Show Previous Tab', icon: LuSquareChevronLeft, shortcut: '⌃⇧⇥', disabled: true },
      { label: 'Show Next Tab', icon: LuSquareChevronRight, shortcut: '⌃⇥', disabled: true },
      { label: 'Move Tab to New Window', icon: LuAppWindow, disabled: true },
      { label: 'Merge All Windows', icon: LuCopy, disabled: true },
    ],
  },
  {
    title: 'Help',
    search: true,
    items: [
      { label: 'macOS Help', icon: LuBookOpen, shortcut: '⌘?' },
      { label: 'Tips for Your Mac', icon: LuLightbulb },
    ],
  },
];

/** Right-click on a desktop folder. */
export const folderContextMenu = (title: string): MenuEntry[] => [
  { label: 'Open', action: 'open' },
  sep,
  { label: 'Move to Trash', disabled: true },
  sep,
  { label: 'Get Info', action: 'getInfo' },
  { label: 'Rename', disabled: true },
  { label: `Compress “${title}”`, disabled: true },
  { label: 'Duplicate', disabled: true },
  { label: 'Make Alias', disabled: true },
  { label: `Quick Look “${title}”`, action: 'quickLook' },
  sep,
  { label: 'Copy', disabled: true },
  { label: 'Share…', disabled: true },
  sep,
  { type: 'tags' },
  { label: 'Tags…', disabled: true },
];

/** Right-click on the empty desktop. */
export const desktopContextMenu: MenuEntry[] = [
  { label: 'New Folder', disabled: true },
  sep,
  { label: 'Get Info', disabled: true },
  sep,
  { label: 'Change Appearance…', action: 'appearance' },
  { label: 'Edit Widgets…', disabled: true },
  sep,
  { label: 'Use Stacks', disabled: true },
  {
    label: 'Sort By',
    submenu: [{ label: 'None', checked: true }, sep, { label: 'Name' }, { label: 'Kind' }, { label: 'Date Created' }, { label: 'Tags' }],
  },
  { label: 'Clean Up', action: 'cleanUp' },
  { label: 'Show View Options', disabled: true },
];
