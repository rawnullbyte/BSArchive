// by mye - raknet.add_send_hook on dc
'use strict';
const OFFSETS = {
    DisplayObject_setXY:                       12675924,  
    MovieClipHelper_setTextAndScaleIfNecessary:10030112,  
    dropGUIContainer_addGameButton:             5870856,  
    DisplayObject_setPixelSnappedXY:           12675924,  
    MovieClip_getTextFieldByName:              12703664,  
    movieClip_setText:                         12905872,  
    StringTable_getMovieClip:                  12504672,  
    MovieClip_getChildByName:                  12703056,  
    GameButton_setText:                         5866136,  
    DisplayObject_removeFromParent:            12676776,  
    Stage_addChild:                            12793504,  
    CustomButton_buttonPressed:                12902348,  
    stringCtor:                                14481648,  
    Sprite_ctor:                               12768900,  
    gotoAndStop:                               12699916,  
    GameButton_ctor:                            5864520,  
    dropCtor:                                   5869708,  
    setInteractiveRecursive:                   12701664,  
    DecoratedTextField_setupDecoratedText:      5826492,  
    LogicDataTables_getColorGradientByName:    10860960,  
    GameSliderComponent_ctor:                   5881860,  
    GameSliderComponent_setBounds:              5883912,  
    GameSlider_refreshLogic:                    5882920,  
    GameSlider_update:                          5883580,  
    GameMain_update_a:                          4934524,  
    StartSpectateMessage_StartSpectateMessage: 12014756,  
    operator_new:                              17758960,  
    GenericPopup_GenericPopup:                  7092408,  
    GenericPopup_addPopupButton:                7095340,  
    GameInputField_GameInputField:              5873396,  
    GameInputField_setMaxTextLength:           14756812,  
    TextField_reset:                           12884036,  
    stage_instance:                            19108832,  
    MessageManagerPtr:                         19089112,  
    SpectatePopupVTable:                       18009280,  
    HashTagCodeGeneratorPlayerChars:           29622468,  
    LogicBattleModeClient_update:              12119776,
    LogicGameObjectClient_getX:                11422236,  
    LogicGameObjectClient_getY:                11422244,  
    LogicBattleModeClient_getOwnCharacter:     12126760,  
    BattleScreen_getClosestTargetForAutoshoot:  8475104,  
    BattleScreen_activateSkill:                 8398668,  
    BattleScreen_tryToActivateSkill:            8399200,  
    BattleScreen_updateMovement:                8426312,  
    BattleScreen_convertToControlScheme:        8443736,  
    BattleScreen_getLogicBattleModeClient:      8426312,  
    LogicSkillClient_getData:                  11524496,
    LogicSkillData_getProjectile:              11092812,
    LogicProjectileData_getSpeed:              11015628,
    LogicProjectileData_getRadius:             11015756,
    LogicGameObjectClient_getGlobalID:         11422152,
    BattleMode_getInstance:                     9785056,
    LogicBattleModeClient_isUltiReadyForClient: 8489932,
    BattleScreen_autoShoot:                    12127236,
    Character_getUltiSkillServer:               8443736,
    Character_getPrimarySkillServer:           11236260,
    LogicSkillData_getCastingRange:            11223952,
    isImmuneAndBulletsGoThrough:               11092244,
    hasAmmo:                                   11226720,
    getSkillRechargeMs:                        11226644,
    getRangeFromSkillServer:                   11226128,
    BattleScreen_getClosestTargetForAutoshoot_alt: 8397172,
    LogicBattleModeClient_update_alt:             12408296,
    AttackHeld_byteOffset: 0xED1,
    UltiHeld_byteOffset:   0xED2,
    PROJECTILE_SPEED_OFFS: 0x40,
    PROJECTILE_RADIUS_OFFS:0x44,
    OFF_BATTLE_MODE_CLIENT_MIRROR: 950,
    IChildArray_off: 0xB0,
    ChildArray_off:  0x10,
};
const OFF_DO_VISIBLE        = 0x2A08;
const OFF_DO_SCALE_X        = 0x2A10;
const OFF_DO_SCALE_Y        = 0x2A1C;
const OFF_DO_MAP_PROBE      = 0x2A14;
const OFF_CHAR_HP_CUR       = 0x00AC;
const OFF_CHAR_HP_MAX       = 0x00B0;
const OFF_CHAR_CAST_SCRATCH = 0x3E64;
const OFF_SKILL_AX          = 0x09B8;
const OFF_SKILL_AY          = 0x09BC;
const OFF_SKILL_BX          = 0x09C0;
const OFF_SKILL_BY          = 0x09C4;
const OFF_SKILL_STATE       = 0x0ED7;
const OFF_SKILL_MODE        = 0x08AC;
const OFF_SKILL_AA          = 0x08F4;
const OFF_SKILL_AB          = 0x08F8;
const OFF_SLIDER_GET_CB     = 200;
const OFF_SLIDER_MIN        = 204;
const OFF_SLIDER_MAX        = 208;
const OFF_SLIDER_KNOB       = 264;
const OFF_SLIDER_LABEL      = 272;
const OFF_SLIDER_TRACK      = 280;
const OFF_SLIDER_DRAGGING   = 288;
const OFF_SLIDER_TOUCH_X    = 296;
const OFF_SLIDER_TOUCH_OFF  = 300;
const OFF_SLIDER_VISIBLE    = 304;
const OFF_SLIDER_TXT_H      = 308;
const OFF_SLIDER_BUBBLE_W   = 312;
const TILE_DATA                = 1;
const TILE_SPECIAL_MOVE_BLOCK  = 0xCB78;
const OFF_TM_WIDTH             = 196;
const OFF_TM_HEIGHT            = 200;
const TILEMAP_WIDTH            = 196;
const TILEMAP_HEIGHT           = 200;
const TILE_SIZE                = 300;
const SL_FIELD = {
    get: 0, min: 8, max: 16, knobPtr: 264, labelPtr: 272, trackPtr: 280,
    dragging: 288, touchX: 296, touchOff: 300, visible: 304, txtH: 308, bubbleW: 312,
};
const SAFE_WALK_LOOKUP_BASE      = 300;
const SAFE_WALK_RELEASE_DISTANCE = 240;
const SAFE_WALK_RAW_DELTA        = 25;
const WALL_PATH_PADDING          = 30;
const SAFETY_MARGIN              = 35;
const PRECISION_BASE             = 128;
const SPAM_WINDOW_MS_DEFAULT     = 700;
const CLOSE_BUTTON_SCALE     = 0.65;
const POPUP_SCALE            = 1.0;
const LABEL_NUDGE            = 4;
const QUICK_ACCESS_SLOT_STEP = 70;
const QUICK_ACCESS_TOP_Y     = 120;
const QUICK_ACCESS_PENDING_COLORS = [0xFFFFFF, 0xC0E0FF, 0x80B8FF, 0x4080FF];
const TOGGLE_PARENT_EXPORT = 'modifier_item';
const TOGGLE_CHILD_EXPORT  = 'mod_toggle';
const TOGGLE_FIELD_ON      = 'on_txt';
const TOGGLE_FIELD_OFF     = 'off_txt';
const FPS_SCALE = 0.85;
const BATTLE_MODE_LETTERS = ['Y', 'L', 'Q', 'G', 'R', 'J', 'C', 'U', 'V'];
const TABS_CONFIG = {
    map: ['Home', 'Cheats', 'Visual', 'Misc'],
    defaultTab: 'Home',
    tabs: ['Home', 'Cheats', 'Visual', 'Misc'],
    tabsSpacing: 143,
    tabsStartX: 0,
    tabsStartY: 0,
    tabsOffsetX: 0,
    tabsOffsetY: 0,
    x: 0,
    y: 0,
    title: 'Null Rythm',
    closeX: 600,
    closeY: -360,
};
const SKILL_DB = {
    ShotgunGirlProjectile:                       { Name:'ShotgunGirlWeapon',           CastingRange:7500,  Spread:1200, Damage:300, NumBulletsInOneAttack:5 },
    ShotgunGirlOverchargedProjectile:            { Name:'ShotgunGirlOverchargedWeapon',CastingRange:7500,  Spread:1500, Damage:350 },
    ShotgunGirlUltiProjectile:                   { Name:'ShotgunGirlUlti',             CastingRange:6500,  Spread:2400, Damage:500 },
    ShotgunGirlOverchargedUltiProjectile:        { Name:'ShotgunGirlOvUlti',           CastingRange:6500,  Spread:2700, Damage:600 },
    GunslingerProjectile:                        { Name:'GunslingerWeapon',            CastingRange:10000, Spread:300,  Damage:280, NumBulletsInOneAttack:6 },
    GunslingerOverchargedProjectile:             { Name:'GunslingerOverchargedWeapon', CastingRange:10000, Spread:200,  Damage:320 },
    GunslingerUltiProjectile:                    { Name:'GunslingerUlti',              CastingRange:11000, Spread:200,  Damage:340 },
    GunslingerOverchargedUltiProjectile:         { Name:'GunslingerOvUlti',            CastingRange:11000, Spread:150,  Damage:380 },
    BullDudeProjectile:                          { Name:'BullDudeWeapon',              CastingRange:6500,  Spread:1000, Damage:340, NumBulletsInOneAttack:5 },
    BullDudeOverchargedProjectile:               { Name:'BullDudeOverchargedWeapon',   CastingRange:6500,  Spread:900,  Damage:380 },
    RocketGirlProjectile:                        { Name:'RocketGirlWeapon',            CastingRange:11000, Spread:0,    Damage:1200 },
    RocketGirlUltiProjectile:                    { Name:'RocketGirlUlti',              CastingRange:11000, Spread:600,  Damage:660,  NumBulletsInOneAttack:9 },
    RocketGirlUltiOverchargedProjectile:         { Name:'RocketGirlOvUlti',            CastingRange:11000, Spread:600,  Damage:760 },
    TrickshotDudeProjectile:                     { Name:'TrickshotDudeWeapon',         CastingRange:9000,  Spread:200,  Damage:240 },
    TrickshotDudeUltiProjectile:                 { Name:'TrickshotDudeUlti',           CastingRange:9000,  Spread:0,    Damage:160 },
    TrickshotDudeUltiOverchargedProjectile:      { Name:'TrickshotDudeOvUlti',         CastingRange:9000,  Spread:0,    Damage:190 },
    CactusProjectile:                            { Name:'CactusWeapon',                CastingRange:7500,  Spread:0,    Damage:760 },
    CactusOverchargedProjectile:                 { Name:'CactusOverchargedWeapon',     CastingRange:7500,  Spread:0,    Damage:860 },
    CactusUltiProjectile:                        { Name:'CactusUlti',                  CastingRange:6500,  Spread:0,    Damage:340 },
    CactusOverchargedUltiProjectile:             { Name:'CactusOvUlti',                CastingRange:6500,  Spread:0,    Damage:400 },
    BarkeepProjectile:                           { Name:'BarkeepWeapon',               CastingRange:6500,  Spread:0,    Damage:340 },
    BarkeepUltiProjectile:                       { Name:'BarkeepUlti',                 CastingRange:7000,  Spread:0,    Damage:420 },
    BarkeepOverchargedUltiProjectile:            { Name:'BarkeepOvUlti',               CastingRange:7000,  Spread:0,    Damage:500 },
    MechanicProjectile1:                         { Name:'MechanicWeapon',              CastingRange:7500,  Spread:0,    Damage:340 },
    MechanicUltiProjectile:                      { Name:'MechanicUlti',                CastingRange:7500,  Spread:0,    Damage:0 },
    MechanicOverchargedUltiProjectile:           { Name:'MechanicOvUlti',              CastingRange:7500,  Spread:0,    Damage:0 },
    ShamanProjectile:                            { Name:'ShamanWeapon',                CastingRange:6500,  Spread:600,  Damage:300, NumBulletsInOneAttack:3 },
    ShamanOverchargedProjectile:                 { Name:'ShamanOverchargedWeapon',     CastingRange:6500,  Spread:500,  Damage:340 },
    ShamanUltiProjectile:                        { Name:'ShamanUlti',                  CastingRange:6500,  Spread:0,    Damage:0 },
    ShamanOverChargedUltiProjectile:             { Name:'ShamanOvUlti',                CastingRange:6500,  Spread:0,    Damage:0 },
    TntDudeProjectile:                           { Name:'TntDudeWeapon',               CastingRange:8000,  Spread:0,    Damage:600 },
    TntDudeUltiProjectile:                       { Name:'TntDudeUlti',                 CastingRange:11000, Spread:0,    Damage:1000 },
    TntDudeOverchargedUltiProjectile:            { Name:'TntDudeOvUlti',               CastingRange:11000, Spread:0,    Damage:1200 },
    PrimoDefProjectile:                          { Name:'LuchadorWeapon',              CastingRange:3500,  Spread:0,    Damage:340, NumBulletsInOneAttack:4 },
    UndertakerUltiProjectile:                    { Name:'UndertakerUlti',              CastingRange:0,     Spread:0,    Damage:1000 },
    UndertakerOverchargedUltiProjectile:         { Name:'UndertakerOvUlti',            CastingRange:0,     Spread:0,    Damage:1200 },
    CrowProjectile:                              { Name:'CrowWeapon',                  CastingRange:8000,  Spread:600,  Damage:140, NumBulletsInOneAttack:3 },
    CrowOverchargedProjectile:                   { Name:'CrowOverchargedWeapon',       CastingRange:8000,  Spread:550,  Damage:160 },
    DeadMariachiProjectile:                      { Name:'DeadMariachiWeapon',          CastingRange:8000,  Spread:1500, Damage:220 },
    DeadMariachiUltiProjectile:                  { Name:'DeadMariachiUlti',            CastingRange:7500,  Spread:6000, Damage:0 },
    DeadMariachiOverchargedUltiProjectile:       { Name:'DeadMariachiOvUlti',          CastingRange:7500,  Spread:6500, Damage:0 },
    BowDudeProjectile:                           { Name:'BowDudeWeapon',               CastingRange:8500,  Spread:1000, Damage:240, NumBulletsInOneAttack:3 },
    BowDudeSpawnMineProjectile:                  { Name:'BowDudeUlti',                 CastingRange:7000,  Spread:0,    Damage:0 },
    BowDudeSpawnOverchargedMineProjectile:       { Name:'BowDudeOvUlti',               CastingRange:7000,  Spread:0,    Damage:0 },
    SniperProjectile:                            { Name:'InstagibWeapon',              CastingRange:12500, Spread:0,    Damage:240 },
    MinigunDudeProjectile:                       { Name:'MinigunDudeWeapon',           CastingRange:7000,  Spread:1000, Damage:160, NumBulletsInOneAttack:8 },
    MinigunDudeUltiProjectile:                   { Name:'MinigunDudeUlti',             CastingRange:6500,  Spread:0,    Damage:0 },
    MinigunDudeOverchargedUltiProjectile:        { Name:'MinigunDudeOvUlti',           CastingRange:6500,  Spread:0,    Damage:0 },
    BlackHoleProjectile:                         { Name:'BlackHoleWeapon',             CastingRange:8000,  Spread:0,    Damage:380, NumBulletsInOneAttack:3 },
    BlackHoleUltiProjectile:                     { Name:'BlackHoleUlti',               CastingRange:7500,  Spread:0,    Damage:0 },
    BlackHoleOverchargedUltiProjectile:          { Name:'BlackHoleOvUlti',             CastingRange:7500,  Spread:0,    Damage:0 },
    BarrelBotProjectile:                         { Name:'BarrelBotWeapon',             CastingRange:6500,  Spread:1100, Damage:260, NumBulletsInOneAttack:5 },
    BarrelBotOverchargedProjectile:              { Name:'BarrelBotOvWeapon',           CastingRange:6500,  Spread:1000, Damage:300 },
    ArtilleryDudeProjectile:                     { Name:'ArtilleryDudeWeapon',         CastingRange:9000,  Spread:0,    Damage:380 },
    ArtilleryDudeUltiProjectile:                 { Name:'ArtilleryDudeUlti',           CastingRange:12500, Spread:0,    Damage:240 },
    ArtilleryDudeOverchargedUltiProjectile:      { Name:'ArtilleryDudeOvUlti',         CastingRange:12500, Spread:0,    Damage:300 },
    HammerDudeProjectile:                        { Name:'HammerDudeWeapon',            CastingRange:5500,  Spread:0,    Damage:880 },
    HammerDudeUltiProjectile:                    { Name:'HammerDudeUlti',              CastingRange:7000,  Spread:0,    Damage:1000 },
    HammerDudeOverchargedUltiProjectile:         { Name:'HammerDudeOvUlti',            CastingRange:7000,  Spread:0,    Damage:1200 },
    HookProjectile:                              { Name:'HookWeapon',                  CastingRange:7500,  Spread:1800, Damage:280, NumBulletsInOneAttack:4 },
    HookUltiProjectile:                          { Name:'HookUlti',                    CastingRange:10000, Spread:0,    Damage:240 },
    HookUltiOverchargedProjectile:               { Name:'HookOvUlti',                  CastingRange:10000, Spread:0,    Damage:280 },
    ClusterBombProjectile:                       { Name:'ClusterBombDudeWeapon',       CastingRange:8000,  Spread:0,    Damage:380 },
    ClusterBombSummonProjectile:                 { Name:'ClusterBombDudeUlti',         CastingRange:9000,  Spread:0,    Damage:560 },
    ClusterBombOverchargedSummonProjectile:      { Name:'ClusterBombDudeOvUlti',       CastingRange:9000,  Spread:0,    Damage:660 },
    BoneThrowerProjectile:                       { Name:'BoneThrowerWeapon',           CastingRange:8500,  Spread:0,    Damage:480 },
    BoneThrowerUltiProjectile:                   { Name:'BoneThrowerUlti',             CastingRange:9000,  Spread:0,    Damage:600 },
    LeonDefProjectile:                           { Name:'NinjaWeapon',                 CastingRange:7000,  Spread:1200, Damage:260, NumBulletsInOneAttack:4 },
    LeonDefOverchargedProjectile:                { Name:'NinjaOverchargedWeapon',      CastingRange:7000,  Spread:1100, Damage:300 },
    RosaProjectile:                              { Name:'RosaWeapon',                  CastingRange:5000,  Spread:1100, Damage:340, NumBulletsInOneAttack:3 },
    SandstormProjectile:                         { Name:'SandstormWeapon',             CastingRange:8500,  Spread:0,    Damage:340 },
    SandstormUltiProjectile:                     { Name:'SandstormUlti',               CastingRange:6500,  Spread:0,    Damage:0 },
    SandstormOverchargedUltiProjectile:          { Name:'SandstormOvUlti',             CastingRange:6500,  Spread:0,    Damage:0 },
    WhirlwindProjectile:                         { Name:'WhirlwindWeapon',             CastingRange:8000,  Spread:0,    Damage:320 },
    BaseballUltiProjectile:                      { Name:'BaseballUlti',                CastingRange:7000,  Spread:0,    Damage:1000 },
    BaseballOverchargedUltiProjectile:           { Name:'BaseballOvUlti',              CastingRange:7000,  Spread:0,    Damage:1200 },
    ArcadeProjectile:                            { Name:'ArcadeWeapon',                CastingRange:8500,  Spread:600,  Damage:300, NumBulletsInOneAttack:3 },
    ArcadeUltiProjectile:                        { Name:'ArcadeUlti',                  CastingRange:0,     Spread:0,    Damage:0 },
    ArcadeUltiOverchargedProjectile:             { Name:'ArcadeOvUlti',                CastingRange:0,     Spread:0,    Damage:0 },
    BeeSniperProjectile:                         { Name:'BeeSniperWeapon',             CastingRange:9500,  Spread:0,    Damage:520 },
    BeeSniperChargedProjectile:                  { Name:'BeeSniperWeaponCharged',      CastingRange:9500,  Spread:0,    Damage:1560 },
    BeeSniperUltiProjectile:                     { Name:'BeeSniperUlti',               CastingRange:9000,  Spread:0,    Damage:0 },
    BeaOverchargedUltiProjectile:                { Name:'BeeSniperOvUlti',             CastingRange:9000,  Spread:0,    Damage:0 },
    MummyProjectile:                             { Name:'MummyWeapon',                 CastingRange:6500,  Spread:0,    Damage:520 },
    SpawnerDudeProjectile:                       { Name:'SpawnerDudeWeapon',           CastingRange:8000,  Spread:0,    Damage:520 },
    SpawnerDudeUltiProjectile:                   { Name:'SpawnerDudeUlti',             CastingRange:8000,  Spread:0,    Damage:0 },
    SpawnerDudeOverchargedUltiProjectile:        { Name:'SpawnerDudeOvUlti',           CastingRange:8000,  Spread:0,    Damage:0 },
    SpeedyProjectile:                            { Name:'SpeedyWeapon',                CastingRange:7000,  Spread:300,  Damage:180, NumBulletsInOneAttack:6 },
    BlowerProjectile:                            { Name:'BlowerWeapon',                CastingRange:7500,  Spread:1500, Damage:180, NumBulletsInOneAttack:4 },
    BlowerUltiProjectile:                        { Name:'BlowerUlti',                  CastingRange:8500,  Spread:0,    Damage:340 },
    BlowerUltiOverchargedProjectile:             { Name:'BlowerOvUlti',                CastingRange:8500,  Spread:0,    Damage:400 },
    ControllerProjectile:                        { Name:'ControllerWeapon',            CastingRange:9500,  Spread:300,  Damage:240, NumBulletsInOneAttack:3 },
    ControllerUltiProjectile:                    { Name:'ControllerUlti',              CastingRange:14000, Spread:0,    Damage:1480 },
    ControllerUltiOverchargedProjectile:         { Name:'ControllerOvUlti',            CastingRange:14000, Spread:0,    Damage:1700 },
    WallyProjectile:                             { Name:'WallyWeapon',                 CastingRange:8500,  Spread:0,    Damage:1000 },
    WallyUltiProjectile:                         { Name:'WallyUlti',                   CastingRange:9000,  Spread:0,    Damage:0 },
    WallyOverchargedUltiProjectile:              { Name:'WallyOvUlti',                 CastingRange:9000,  Spread:0,    Damage:0 },
    PowerLevelerProjectile:                      { Name:'PowerLevelerWeapon',          CastingRange:8000,  Spread:300,  Damage:340, NumBulletsInOneAttack:2 },
    PowerLevelerOverchargedProjectile:           { Name:'PowerLevelerOvWeapon',        CastingRange:8000,  Spread:250,  Damage:400 },
    FireDudeProjectile:                          { Name:'FireDudeWeapon',              CastingRange:9000,  Spread:300,  Damage:280 },
    FireDudeUltiProjectile:                      { Name:'FireDudeUlti',                CastingRange:8000,  Spread:0,    Damage:340 },
    FireDudeOverchargedUltiProjectile:           { Name:'FireDudeOvUlti',              CastingRange:8000,  Spread:0,    Damage:400 },
    IceDudeProjectile:                           { Name:'IceDudeWeapon',               CastingRange:8000,  Spread:300,  Damage:240, NumBulletsInOneAttack:3 },
    IceDudeUltiProjectile:                       { Name:'IceDudeUlti',                 CastingRange:7000,  Spread:0,    Damage:0 },
    IceDudeOverchargedUltiProjectile:            { Name:'IceDudeOvUlti',               CastingRange:7000,  Spread:0,    Damage:0 },
    SnakeOilProjectile:                          { Name:'SnakeOilWeapon',              CastingRange:11000, Spread:0,    Damage:760 },
    SnakeOilUltiProjectile:                      { Name:'SnakeOilUlti',                CastingRange:12500, Spread:0,    Damage:560 },
    SnakeOilHyperUltiProjectile:                 { Name:'SnakeOilHyperUlti',           CastingRange:12500, Spread:0,    Damage:660 },
    EnragerProjectile:                           { Name:'EnragerWeapon',               CastingRange:3500,  Spread:1000, Damage:560, NumBulletsInOneAttack:2 },
    RuffsProjectile:                             { Name:'RuffsWeapon',                 CastingRange:8500,  Spread:300,  Damage:240, NumBulletsInOneAttack:3 },
    RuffsUltiProjectile:                         { Name:'RuffsUlti',                   CastingRange:8500,  Spread:0,    Damage:0 },
    RuffsOverchargedUltiProjectile:              { Name:'RuffsOvUlti',                 CastingRange:8500,  Spread:0,    Damage:0 },
    RollerProjectile:                            { Name:'RollerWeapon',                CastingRange:8000,  Spread:600,  Damage:760, NumBulletsInOneAttack:2 },
    RollerOverchargedProjectile:                 { Name:'RollerOvWeapon',              CastingRange:8000,  Spread:550,  Damage:860 },
    ElectroSniperProjectile:                     { Name:'ElectroSniperWeapon',         CastingRange:11500, Spread:0,    Damage:880 },
    ElectroSniperUltiProjectile:                 { Name:'ElectroSniperUlti',           CastingRange:14000, Spread:0,    Damage:1000 },
    ElectroSniperOverchargedUltiProjectile:      { Name:'ElectroSniperOvUlti',         CastingRange:14000, Spread:0,    Damage:1200 },
    StickyBombProjectile:                        { Name:'StickyBombWeapon',            CastingRange:7500,  Spread:0,    Damage:380 },
    StickyBombUltiProjectile:                    { Name:'StickyBombUlti',              CastingRange:8500,  Spread:0,    Damage:600 },
    StickyBombOverchargedUltiProjectile:         { Name:'StickyBombOvUlti',            CastingRange:8500,  Spread:0,    Damage:700 },
    CrossBomberProjectile:                       { Name:'CrossBomberWeapon',           CastingRange:8000,  Spread:0,    Damage:1240 },
    CrossBomberUltiProjectile:                   { Name:'CrossBomberUlti',             CastingRange:8500,  Spread:0,    Damage:1480 },
    OverchargedCrossBomberUltiProjectile:        { Name:'CrossBomberOvUlti',           CastingRange:8500,  Spread:0,    Damage:1700 },
    RopeDudeProjectile:                          { Name:'RopeDudeWeapon',              CastingRange:8500,  Spread:0,    Damage:560 },
    RopeDudeUltiProjectile:                      { Name:'RopeDudeUlti',                CastingRange:8500,  Spread:0,    Damage:0 },
    RopeDudeOverchargedUltiProjectile:           { Name:'RopeDudeOvUlti',              CastingRange:8500,  Spread:0,    Damage:0 },
    AssaultShotgunProjectile:                    { Name:'AssaultShotgunWeapon',        CastingRange:7500,  Spread:1100, Damage:200, NumBulletsInOneAttack:9 },
    AssaultShotgunUltiProjectile:                { Name:'AssaultShotgunUlti',          CastingRange:8500,  Spread:1000, Damage:540 },
    AssaultShotgunOverchargedUltiProjectile:     { Name:'AssaultShotgunOvUlti',        CastingRange:8500,  Spread:900,  Damage:620 },
    AssaultShotgunOverchargedProjectile:         { Name:'AssaultShotgunOvWeapon',      CastingRange:7500,  Spread:1000, Damage:240 },
    KnightProjectile1:                           { Name:'KnightWeapon',                CastingRange:6500,  Spread:0,    Damage:760, NumBulletsInOneAttack:2 },
    KnightUltiProjectile:                        { Name:'KnightUlti',                  CastingRange:6500,  Spread:0,    Damage:0 },
    KnightOverchargedUltiProjectile:             { Name:'KnightOvUlti',                CastingRange:6500,  Spread:0,    Damage:0 },
    JetpackGirlProjectile:                       { Name:'JetpackGirlWeapon',           CastingRange:8000,  Spread:0,    Damage:560 },
    JetpackGirlUltiProjectile:                   { Name:'JetpackGirlUlti',             CastingRange:14000, Spread:200,  Damage:660 },
    JetpackGirlOverchargedUltiProjectile:        { Name:'JetpackGirlOvUlti',           CastingRange:14000, Spread:150,  Damage:760 },
    CannonGirlProjectile:                        { Name:'CannonGirlWeapon',            CastingRange:11000, Spread:0,    Damage:760 },
    CannonGirlSmallProjectile:                   { Name:'CannonGirlSmallWeapon',       CastingRange:6500,  Spread:1100, Damage:340, NumBulletsInOneAttack:3 },
    SilencerProjectile:                          { Name:'SilencerWeapon',              CastingRange:9500,  Spread:300,  Damage:260, NumBulletsInOneAttack:3 },
    SilencerUltiProjectile:                      { Name:'SilencerUlti',                CastingRange:9000,  Spread:0,    Damage:0 },
    SilencerOverchargedUltiProjectile:           { Name:'SilencerOvUlti',              CastingRange:9000,  Spread:0,    Damage:0 },
    WeaponThrowerProjectile:                     { Name:'WeaponThrowerWeapon',         CastingRange:8500,  Spread:0,    Damage:600 },
    WeaponThrowerProjectile2:                    { Name:'WeaponThrowerWeapon2',        CastingRange:6500,  Spread:0,    Damage:400 },
    WeaponThrowerUltiProjectile:                 { Name:'WeaponThrowerUlti',           CastingRange:9000,  Spread:0,    Damage:1200 },
    WeaponThrowerOverchargedUltiProjectile:      { Name:'WeaponThrowerOvUlti',         CastingRange:9000,  Spread:0,    Damage:1400 },
    WeaponThrowerUltiProjectile2:                { Name:'WeaponThrowerUlti2',          CastingRange:9000,  Spread:0,    Damage:1000 },
    WeaponThrowerOverchargedUltiProjectile2:     { Name:'WeaponThrowerOvUlti2',        CastingRange:9000,  Spread:0,    Damage:1200 },
    SoulCollectorProjectile:                     { Name:'SoulCollectorWeapon',         CastingRange:8500,  Spread:0,    Damage:340 },
    SoulCollectorUltiProjectile:                 { Name:'SoulCollectorUlti',           CastingRange:8500,  Spread:0,    Damage:0 },
    GusOverchargedUltiProjectile:                { Name:'SoulCollectorOvUlti',         CastingRange:8500,  Spread:0,    Damage:0 },
    ShieldTankProjectile:                        { Name:'ShieldTankWeapon',            CastingRange:6000,  Spread:1500, Damage:260, NumBulletsInOneAttack:5 },
    ShieldTankUltiProjectile:                    { Name:'ShieldTankUlti',              CastingRange:9000,  Spread:0,    Damage:240 },
    ShieldTankOverchargedUltiProjectile:         { Name:'ShieldTankOvUlti',            CastingRange:9000,  Spread:0,    Damage:280 },
    JesterProjectile:                            { Name:'JesterWeapon',                CastingRange:7000,  Spread:1300, Damage:200, NumBulletsInOneAttack:5 },
    JesterUltiProjectileExploding:               { Name:'JesterUltiExploding',         CastingRange:8500,  Spread:0,    Damage:760 },
    JesterUltiProjectileStunning:                { Name:'JesterUltiStunning',          CastingRange:8500,  Spread:0,    Damage:480 },
    JesterUltiProjectilePoisoning:               { Name:'JesterUltiPoisoning',         CastingRange:8500,  Spread:0,    Damage:480 },
    ChesterOverchargedUltiProjectile:            { Name:'JesterOvUlti',                CastingRange:8500,  Spread:0,    Damage:900 },
    DoorManProjectile:                           { Name:'DoorManWeapon',               CastingRange:8500,  Spread:0,    Damage:520 },
    BeamerProjectile:                            { Name:'BeamerWeapon',                CastingRange:8500,  Spread:0,    Damage:340 },
    BeamerUltiProjectile:                        { Name:'BeamerUlti',                  CastingRange:12500, Spread:0,    Damage:1000 },
    BeameOverchargedUltiProjectile:              { Name:'BeamerOvUlti',                CastingRange:12500, Spread:0,    Damage:1200 },
    SplitterProjectile:                          { Name:'SplitterWeapon',              CastingRange:8000,  Spread:300,  Damage:340 },
    PuppeteerProjectile:                         { Name:'PuppeteerWeapon',             CastingRange:8000,  Spread:0,    Damage:520 },
    PuppeteerUltiProjectile:                     { Name:'PuppeteerUlti',               CastingRange:9000,  Spread:0,    Damage:0 },
    OverchargedPuppeteerUltiProjectile:          { Name:'PuppeteerOvUlti',             CastingRange:9000,  Spread:0,    Damage:0 },
    MaisieProjectile:                            { Name:'MaisieWeapon',                CastingRange:9000,  Spread:0,    Damage:880 },
    DuelistProjectile:                           { Name:'DuelistWeapon',               CastingRange:7000,  Spread:0,    Damage:380, NumBulletsInOneAttack:3 },
    DuelistUltiProjectile:                       { Name:'DuelistUlti',                 CastingRange:6500,  Spread:0,    Damage:0 },
    DuelistOverchargedUltiProjectile:            { Name:'DuelistOvUlti',               CastingRange:6500,  Spread:0,    Damage:0 },
    ReviverUltiProjectile:                       { Name:'ReviverUlti',                 CastingRange:8500,  Spread:0,    Damage:560 },
    ReviverOverchargedUltiProjectile:            { Name:'ReviverOvUlti',               CastingRange:8500,  Spread:0,    Damage:660 },
    CookerProjectile:                            { Name:'CookerWeapon',                CastingRange:7500,  Spread:0,    Damage:560 },
    ConductorProjectile:                         { Name:'ConductorWeapon',             CastingRange:8000,  Spread:0,    Damage:600 },
    ConductorUltiProjectile:                     { Name:'ConductorUlti',               CastingRange:10000, Spread:0,    Damage:1000 },
    CocoonerProjectile:                          { Name:'CocoonerWeapon',              CastingRange:7000,  Spread:0,    Damage:480 },
    CocoonerUltiProjectile:                      { Name:'CocoonerUlti',                CastingRange:8000,  Spread:0,    Damage:0 },
    CocoonerOverchargedUltiProjectile:           { Name:'CocoonerOvUlti',              CastingRange:8000,  Spread:0,    Damage:0 },
    AttacherProjectile:                          { Name:'AttacherWeapon',              CastingRange:8500,  Spread:300,  Damage:200, NumBulletsInOneAttack:5 },
    AttacherProjectileOvercharged:               { Name:'AttacherOvWeapon',            CastingRange:8500,  Spread:250,  Damage:240 },
    TwinsThrowerProjectile:                      { Name:'TwinsWeaponThrower',          CastingRange:8500,  Spread:0,    Damage:600 },
    TwinsShotgunProjectile:                      { Name:'TwinsWeaponShotgun',          CastingRange:7000,  Spread:1100, Damage:340, NumBulletsInOneAttack:5 },
    TwinsUltiProjectile:                         { Name:'TwinsUlti',                   CastingRange:9000,  Spread:0,    Damage:660 },
    TwinsHCUltiProjectile:                       { Name:'TwinsHyperUlti',              CastingRange:9000,  Spread:0,    Damage:800 },
    AxeJugglerProjectile:                        { Name:'AxeJugglerWeapon',            CastingRange:7000,  Spread:300,  Damage:340, NumBulletsInOneAttack:3 },
    AxeJugglerOverchargedProjectile2:            { Name:'AxeJugglerOvWeapon',          CastingRange:7000,  Spread:250,  Damage:380 },
    MosquitoProjectile:                          { Name:'InsectManWeapon',             CastingRange:11000, Spread:0,    Damage:380 },
    MosquitoProjectilePoison:                    { Name:'InsectManWeaponPoison',       CastingRange:11000, Spread:0,    Damage:340 },
    DragonRiderProjectile:                       { Name:'DragonRiderWeapon',           CastingRange:8500,  Spread:0,    Damage:660 },
    DragonRiderDragonProjectile:                 { Name:'DragonRiderDragonWeapon',     CastingRange:8500,  Spread:0,    Damage:480 },
    DragonRiderDragonOverchargedProjectile:      { Name:'DragonRiderDragonOvWeapon',   CastingRange:8500,  Spread:0,    Damage:560 },
    AmbusherProjectile:                          { Name:'AmbusherWeapon',              CastingRange:6500,  Spread:0,    Damage:760 },
    AmbusherUltiProjectile:                      { Name:'AmbusherUlti',                CastingRange:6500,  Spread:0,    Damage:1200 },
    AmbusherUltiProjectile2:                     { Name:'AmbusherUlti2',               CastingRange:6500,  Spread:0,    Damage:1000 },
    AmbusherOverchargedUltiProjectile:           { Name:'AmbusherOvUlti',              CastingRange:6500,  Spread:0,    Damage:1400 },
    PainterProjectile:                           { Name:'PainterWeapon',               CastingRange:8000,  Spread:0,    Damage:560 },
    CrabProjectile:                              { Name:'CrabWeapon1',                 CastingRange:8000,  Spread:300,  Damage:380 },
    CrabUltiProjectile:                          { Name:'CrabUlti',                    CastingRange:9000,  Spread:0,    Damage:560 },
    CrabOverchargedUltiProjectile:               { Name:'CrabOvUlti',                  CastingRange:9000,  Spread:0,    Damage:660 },
    DiggerProjectile:                            { Name:'DiggerWeapon',                CastingRange:8000,  Spread:600,  Damage:260, NumBulletsInOneAttack:3 },
    DiggerDrillProjectile:                       { Name:'DiggerDrillWeapon',           CastingRange:6500,  Spread:0,    Damage:520 },
    DiggerDrillOverchargedProjectile:            { Name:'DiggerDrillOvWeapon',         CastingRange:6500,  Spread:0,    Damage:620 },
    SamuraiUltiProjectile:                       { Name:'SamuraiUlti',                 CastingRange:6500,  Spread:0,    Damage:1000 },
    SamuraiOverchargedUltiProjectile:            { Name:'SamuraiOvUlti',               CastingRange:6500,  Spread:0,    Damage:1200 },
    VoodooProjectileEarth:                       { Name:'VoodooWeaponEarth',           CastingRange:7000,  Spread:0,    Damage:340 },
    VoodooProjectileForest:                      { Name:'VoodooWeaponForest',          CastingRange:7000,  Spread:0,    Damage:340 },
    VoodooProjectileWater:                       { Name:'VoodooWeaponWater',           CastingRange:7000,  Spread:0,    Damage:340 },
    VoodooProjectileAll:                         { Name:'VoodooWeaponAll',             CastingRange:7000,  Spread:0,    Damage:340 },
    VoodooUltiProjectile:                        { Name:'VoodooUlti',                  CastingRange:8500,  Spread:0,    Damage:660 },
    VoodooOverchargedUltiProjectile:             { Name:'VoodooOvUlti',                CastingRange:8500,  Spread:0,    Damage:760 },
    LightyearLaserProjectile:                    { Name:'LightyearWeapon',             CastingRange:9000,  Spread:0,    Damage:560 },
    LightyearLaserUltiProjectile:                { Name:'LightyearUlti',               CastingRange:9000,  Spread:0,    Damage:880 },
    LightyearFlightProjectile:                   { Name:'LightyearFlightWeapon',       CastingRange:8500,  Spread:0,    Damage:480 },
    LightyearFlightUltiProjectile:               { Name:'LightyearFlightUlti',         CastingRange:8500,  Spread:0,    Damage:760 },
    MeepleProjectile:                            { Name:'MeepleWeapon',                CastingRange:7000,  Spread:300,  Damage:380, NumBulletsInOneAttack:3 },
    MeepleWallProjectile:                        { Name:'MeepleWallWeapon',            CastingRange:7000,  Spread:300,  Damage:240 },
    MeepleUltiProjectile:                        { Name:'MeepleUlti',                  CastingRange:8500,  Spread:0,    Damage:0 },
    MeepleOverchargedUltiProjectile:             { Name:'MeepleOvUlti',                CastingRange:8500,  Spread:0,    Damage:0 },
    SkaterProjectile:                            { Name:'SkaterWeapon',                CastingRange:7000,  Spread:0,    Damage:480 },
    MorningstarProjectile:                       { Name:'MorningstarWeapon',           CastingRange:8000,  Spread:0,    Damage:480 },
    MorningstarProjectileRecall:                 { Name:'MorningstarWeaponRecall',     CastingRange:8000,  Spread:0,    Damage:240 },
    ChronomancerProjectile:                      { Name:'ChronomancerWeapon',          CastingRange:8500,  Spread:0,    Damage:340 },
    ChronomancerProjectileSecondary:             { Name:'ChronomancerSecondaryWeapon', CastingRange:8500,  Spread:0,    Damage:340 },
    ChronomancerUltiProjectile:                  { Name:'ChronomancerUlti',            CastingRange:9000,  Spread:0,    Damage:0 },
    ChronomancerUltiHyperProjectile:             { Name:'ChronomancerHyperUlti',       CastingRange:9000,  Spread:0,    Damage:0 },
    AlternatorHealProjectile:                    { Name:'AlternatorWeaponHeal',        CastingRange:7000,  Spread:0,    Damage:0 },
    AlternatorSpeedProjectile:                   { Name:'AlternatorWeaponSpeed',       CastingRange:7000,  Spread:0,    Damage:200 },
    AlternatorDamageProjectile:                  { Name:'AlternatorWeaponDamage',      CastingRange:7000,  Spread:0,    Damage:480 },
    AlternatorSlowProjectile:                    { Name:'AlternatorWeaponSlow',        CastingRange:7000,  Spread:0,    Damage:300 },
    DancerProjectileSingle:                      { Name:'DancerWeaponSingle',          CastingRange:7000,  Spread:300,  Damage:260 },
    DancerProjectileDouble:                      { Name:'DancerWeaponDouble',          CastingRange:7000,  Spread:300,  Damage:240 },
    DancerProjectileTriple:                      { Name:'DancerWeaponTriple',          CastingRange:7000,  Spread:300,  Damage:200 },
    DancerProjectileUlti:                        { Name:'DancerUlti',                  CastingRange:6500,  Spread:0,    Damage:1000 },
    DancerOverchargedProjectileUlti:             { Name:'DancerOvUlti',                CastingRange:6500,  Spread:0,    Damage:1200 },
    FuryProjectile:                              { Name:'FuryWeapon',                  CastingRange:8000,  Spread:300,  Damage:340 },
    FuryProjectileCrit:                          { Name:'FuryWeaponSp',                CastingRange:8000,  Spread:300,  Damage:680 },
    FuryUltiProjectile:                          { Name:'FuryUlti',                    CastingRange:9000,  Spread:0,    Damage:1000 },
    FuryOverchargedUltiProjectile:               { Name:'FuryOvUlti',                  CastingRange:9000,  Spread:0,    Damage:1200 },
    BulletstormProjectile:                       { Name:'BulletstormWeapon',           CastingRange:8500,  Spread:300,  Damage:240, NumBulletsInOneAttack:3 },
    BulletstormLastShotProjectile:               { Name:'BulletstormWeaponLastShot',   CastingRange:8500,  Spread:0,    Damage:720 },
    BulletstormUltiProjectile:                   { Name:'BulletstormUlti',             CastingRange:9000,  Spread:0,    Damage:380 },
    BulletstormUltiOverchargedProjectile:        { Name:'BulletstormOvUlti',           CastingRange:9000,  Spread:0,    Damage:440 },
    RedirecterProjectile:                        { Name:'RedirecterWeapon',            CastingRange:7500,  Spread:600,  Damage:280, NumBulletsInOneAttack:2 },
    RedirecterProjectileSecondary:               { Name:'RedirecterWeaponSecondary',   CastingRange:7500,  Spread:0,    Damage:340 },
    RedirecterUltiProjectile:                    { Name:'RedirecterUlti',              CastingRange:8500,  Spread:0,    Damage:340 },
    GladiatorProjectile:                         { Name:'GladiatorWeapon',             CastingRange:7000,  Spread:300,  Damage:480 },
    GladiatorProjectileFire:                     { Name:'GladiatorWeaponFirePunch',    CastingRange:7000,  Spread:0,    Damage:760 },
    MenderProjectile:                            { Name:'MenderWeapon',                CastingRange:8500,  Spread:0,    Damage:340 },
    MenderUltiProjectile:                        { Name:'MenderUlti',                  CastingRange:8500,  Spread:0,    Damage:0 },
    MenderUltiOverchargedProjectile:             { Name:'MenderOvUlti',                CastingRange:8500,  Spread:0,    Damage:0 },
    ShadowdemonProjectileIndirect:               { Name:'ShadowdemonWeaponIndirect',   CastingRange:8500,  Spread:0,    Damage:480 },
    ShadowdemonProjectileDirect:                 { Name:'ShadowdemonWeaponDirect',     CastingRange:8500,  Spread:0,    Damage:380 },
    ShadowdemonUltiProjectile:                   { Name:'ShadowdemonUlti',             CastingRange:8500,  Spread:0,    Damage:0 },
    ShadowdemonCloneBulletProjectile:            { Name:'ShadowdemonClone',            CastingRange:8500,  Spread:0,    Damage:240 },
    MagicalGirlProjectile:                       { Name:'MagicalGirlWeapon',           CastingRange:8500,  Spread:0,    Damage:380 },
    MagicalGirlProjectile2:                      { Name:'MagicalGirlWeapon2',          CastingRange:8500,  Spread:0,    Damage:380 },
    PercenterProjectile:                         { Name:'PercenterWeapon',             CastingRange:7500,  Spread:0,    Damage:200 },
    PercenterOverchargedProjectile:              { Name:'PercenterOvWeapon',           CastingRange:7500,  Spread:0,    Damage:240 },
    PercenterCharmSkillProjectile:               { Name:'PercenterCharmAttack',        CastingRange:7500,  Spread:0,    Damage:160 },
    PercenterLifestealProjectile:                { Name:'PercenterLifestealAttack',    CastingRange:7500,  Spread:0,    Damage:200 },
    CrowThrowPoisonDaggerSkillProjectile:        { Name:'CrowThrowPoisonDagger',       CastingRange:8000,  Spread:0,    Damage:240 },
    MegaBossPercenterThrowProjectile:            { Name:'MegaBossPercenterThrow',      CastingRange:9500,  Spread:0,    Damage:1200 },
    DummyProjectileForCTF:                       { Name:'DummyForCTF',                 CastingRange:0,     Spread:0,    Damage:0 },
    DummyProjectileForLaserBall:                 { Name:'DummyForLaserBall',           CastingRange:0,     Spread:0,    Damage:0 },
    DummyProjectileForLaserBallBurning:          { Name:'DummyForLaserBallBurning',    CastingRange:0,     Spread:0,    Damage:0 },
    DummyProjectileForBasketBrawl:               { Name:'DummyForBasketBrawl',         CastingRange:0,     Spread:0,    Damage:0 },
    BossProjectile:                              { Name:'BossWeapon',                  CastingRange:9000,  Spread:0,    Damage:1000 },
    BossRaceBossProjectile:                      { Name:'BossRaceBossWeapon',          CastingRange:9000,  Spread:0,    Damage:1000 },
    RaidBossProjectileRed:                       { Name:'RaidBossWeaponRed',           CastingRange:9000,  Spread:0,    Damage:800 },
    RaidBossProjectileGold:                      { Name:'RaidBossWeaponGold',          CastingRange:9000,  Spread:0,    Damage:1200 },
    ActorPlaceholderProjectile:                  { Name:'ActorPlaceholder',            CastingRange:0,     Spread:0,    Damage:0 },
};
let libgLoaded = false;
let libgBase   = null;
let aimbotMenuState        = false;
let holdToShootMenuState   = false;
let killAuraMenuState      = false;
let killAuraMinHealth      = 0;
let killAuraUseUlti        = false;
let holdToShootAim         = false;
let holdToShootFirstShotDelay = 0;
let holdToShootRangeCheck  = false;
let dodgeMenuState         = false;
let autoFarmMenuState      = false;
let dynajumpMenuState      = false;
let spectateByTagUseBrawlTV = false;
let cameraMenuState        = false;
let pinMenuState           = false;
let _cameraMenuState       = false;
let _pinMenuState          = false;
let spinMenuState          = false;
let autoSpinAllowMoving    = true;
let autoSpinJoystickMoving = false;
let fpsMenuState           = false;
let SPAM_WINDOW_MS = 700;
let spinSpeed      = 0.9;
let updateMovementHandlers = [];
let updateMovementHooked   = false;
let orig_updateMovement    = null;
let dodgeMovementBusy      = false;
let FPS_FRAME_STATE = null;
let activeSliders       = [];
let tabMenuObjects      = {};
let manualButtonPairs   = [];
let currentPopup        = null;
let newsBgLayer         = null;
let activeTabText       = null;
let closeButtonPtr      = null;
let exitButton          = null;
let battleMode          = null;
let lastShownPopupKey   = null;
let quickAccessSlotsArr = [
    { id: 'qa0', targetId: null, button: null, widget: null, label: null },
    { id: 'qa1', targetId: null, button: null, widget: null, label: null },
    { id: 'qa2', targetId: null, button: null, widget: null, label: null },
    { id: 'qa3', targetId: null, button: null, widget: null, label: null },
    { id: 'qa4', targetId: null, button: null, widget: null, label: null },
    { id: 'qa5', targetId: null, button: null, widget: null, label: null },
];
let quickAccessSlots = {
    slotBtns:  [],
    slotData:  quickAccessSlotsArr,
    enabled:   true,
};
let quickAccessUi = {
    toggleBtnWidget : null,
    slotBtns        : [],
    slotWidgets     : [],
    isOpen          : false,
    enabled         : true,
    slotsVisible    : true,
    pendingTargetId : null,
    popupRef        : null,
    popupX          : 0,
    created         : false,
};
let quickAccessTargets = new Map();
let STAGE_PTR             = null;
let MessageManagerPtr     = null;
let HashTagCodeGeneratorPlayerChars = '0289PYLQGRJCUV';
let BUTTON_TO_CLIP        = new Map();
let NON_CLICKABLE_PTRS    = new Set();
let Cheats       = {};
let roundingMode = {};
let malloc                              = null;
let memset                              = null;
let stringCtor                          = null;
let strPtrFn                            = null;
let DisplayObject_setPixelSnappedXY     = null;
let DisplayObject_setXY                 = null;
let DisplayObject_removeFromParent      = null;
let Stage_addChild                      = null;
let Sprite_addChild                     = null;
let Sprite_ctor                         = null;
let StringTable_getMovieClip            = null;
let MovieClip_getChildByName            = null;
let MovieClip_getTextFieldByName        = null;
let MovieClipHelper_setTextAndScaleIfNecessary = null;
let GameButton_ctor                     = null;
let GameButton_setText                  = null;
let CustomButton_buttonPressed          = null;
let dropCtorAddr                        = null;
let dropGUIContainer_addGameButton      = null;
let movieClip_setText                   = null;
let gotoAndStop                         = null;
let setInteractiveRecursive             = null;
let DecoratedTextField_setupDecoratedText = null;
let LogicDataTables_getColorGradientByName = null;
let GameSliderComponent_ctor            = null;
let GameSliderComponent_setBounds       = null;
let GameSlider_refreshLogic             = null;
let GameSlider_update                   = null;
let GameMain_update_a                   = null;
let StartSpectateMessage_StartSpectateMessage = null;
let operator_new                        = null;
let GenericPopup_GenericPopup           = null;
let GenericPopup_addPopupButton         = null;
let GameInputField_GameInputField       = null;
let GameInputField_setMaxTextLength     = null;
let TextField_reset                     = null;
let SpectatePopupVTable                 = null;
let MessageManager_sendMessage          = null;
let createTextWidget                    = null;
let createCustomTabSprite               = null;
let createStripPopup                    = null;
let newGameButtonFromClip               = null;
let bumpWidget                          = null;
let applyTextStyling                    = null;
let ensureStageAddChildReady            = null;
let ensureTabObjectsCreated             = null;
let hideAutododgeIfOpen                 = null;
let findTextFieldAnywhere               = null;
let setInteractive                      = null;
let setLabel                            = null;
let asDisplayObject                     = null;
let quickAccessRegisterTarget = null;
let quickAccessRefresh        = null;
let quickAccessColorize       = null;
let quickAccessGradientLabel  = null;
let quickAccessSetSlot        = null;
let quickAccessOpen           = null;
let quickAccessToggle         = null;
let quickAccessShowHide       = null;
let quickAccessResolveTarget  = null;
let quickAccessIsActive       = null;
let UIPopup                             = null;
let WIDGET_BUILDERS                     = {};
let MENU_LAYOUT                         = null;
let CONFIG_UI_POPUPS                    = null;
let unicode = { updateDodgePrecision: 'updateDodgePrecision' };
let ad_precLabel         = null;
let ad_marginLabel       = null;
let ad_lookupLabel       = null;
let ad_ignoreRangeLabel  = null;
let ad_ignoreSpreadLabel = null;
let settingsColor        = null;
let settingsSize         = null;
let settingsDistribution = null;
const DodgeConfig = {
    maxSearchDist:    1500,
    angleVectors:     [],
    safeWalkScans:    [],
    numAngles:        24,
    precision:        3.75,
    stepSize:         150,
    arrivalThreshold: 30,
    PRECISION_BASE:   PRECISION_BASE,
};
const orderedDirsCache = Symbol();
let AUTO_DODGE_MIN_RANGE  = 0;
let AUTO_DODGE_MAX_SPREAD = Infinity;
const AUTO_DODGE_IGNORE_THROWERS = new Set();
let DEFAULT_RANGE         = 9000;
let MAX_LIFETIME_MS       = 5000;
let MIN_LIFETIME_MS       = 50;
let PROJECTILE_WALL_CLIPPING_ENABLED = true;
const config = {
    max:               68,
    lastpositionsLen:  68,
    precision:         60,
    minHealth:          0,
    aimPrecision:       5,
    h2sDelay:          50,
    spamWindowMs:     700,
    spinSpeed:         40,
    safetyMargin:      60,
    safeWalkLookup:   300,
    ignoreMinRange:    10,
    ignoreMaxSpread:  100,
    killAuraUseUlti:   false,
    h2sAutoAim:        false,
    h2sRangeCheck:     false,
    recolorJoystick:   false,
    spinAllowMoving:   false,
    spectateBrawlTv:   false,
    ignoreThrowers:    false,
    timeToHitMultiplyCoeficient: 0.82,
    projectileSpeed:   900,
};
const predictedTarget = { valid: false, x: 0, y: 0 };
const rawTarget       = { valid: false, x: 0, y: 0 };
let framePointMemo           = new Map();
let frameThreatMemo          = new Map();
let frameClearanceMemo       = new Map();
let frameProjectileStartMemo = new Map();
let frameEngineMemo          = new Map();
let frameWalkMemo            = new Map();
let frameAngleSafetyMemo     = new Map();
let frameMemoStamp           = null;
let logicTileMap = null;
let tileToXY     = [];
const state = {
    dodge: false, aimbot: false, killAura: false, holdToShoot: false,
    autoFarm: false, dynajump: false, autoSpin: false, fps: false,
    camera: false, pin: false, recolor: false,
    myPosX: 0, myPosY: 0, myRadius: 360, mySpeed: 720,
    isMirrored: false,
    dodgeTargetX: 0, dodgeTargetY: 0,
    activeProjectiles: new Map(),
    engineCollisionScratch: null,
    killAura: {},
    holdToShoot: {},
    natives: {},
};
let lastTimeMs       = 0;
let latestX          = 0;
let latestY          = 0;
let lastpositionsLen = config.lastpositionsLen;
const timeDiffs      = [];
const perFrameCallbacks = [];
function onFrame(cb) { perFrameCallbacks.push(cb); }
function getPackageName() {
    let f, buf, u, out, i, k;
    try {
        f   = new File('/proc/self/cmdline', 'rb');
        buf = f.readBytes(256);
        f.close();
        out = '';
        const sBytes = new Uint8Array(buf);
        for (i = 0; i < sBytes.length; i++) {
            k = String.fromCharCode(sBytes[i]);
            if (k === '\0') break;
            out += k;
        }
        const colon = out.indexOf(':');
        return colon === -1 ? out : out.slice(0, colon);
    } catch (e) {
        return undefined;
    }
}
function getAdjustedBase(libName) {
    const mod = Process.findModuleByName(libName);
    if (!mod) return null;
    if (getPackageName() === 'daniillnull.nulls.brawlstars') {
        return mod.base.add(0x1000);
    }
    return mod.base;
}
function rebuildDodgeAngleCache() {
    const n = Math.max(1, DodgeConfig.numAngles | 0);
    DodgeConfig.angleVectors = new Array(n);
    const step = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
        const rad = i * step;
        DodgeConfig.angleVectors[i] = { x: Math.cos(rad), y: Math.sin(rad) };
    }
    DodgeConfig[orderedDirsCache] = undefined;
}
function onPrecisionChange(newPrecision) {
    DodgeConfig.precision = newPrecision;
    rebuildDodgeAngleCache();
}
function onSpinSpeedChange(v) {
    spinSpeed = Math.max(0.05, Math.min(1, Math.floor(v * 100) / 100));
}
let __sysprop = null;
function getProp(name) {
    if (!__sysprop) {
        try {
            const sym = Module.findExportByName('libc.so', '__system_property_get');
            if (sym) __sysprop = new NativeFunction(sym, 'int', ['pointer', 'pointer']);
        } catch (_) {}
    }
    if (!__sysprop) return 'Unknown';
    const nn  = Memory.allocUtf8String(name);
    const buf = Memory.allocUtf8String(' '.repeat(128));
    const len = __sysprop(nn, buf);
    if (len > 0) return buf.readUtf8String(len);
    return 'Unknown';
}
function isValidPtr(p) {
    if (p === null || p === undefined) return false;
    if (typeof p === 'symbol') return false;
    try {
        if (typeof p.isNull === 'function' && p.isNull()) return false;
        return true;
    } catch (_) {
        return false;
    }
}
function safeCall(fn ) {
    try {
        if (arguments.length <= 1) return fn();
        const args = Array.prototype.slice.call(arguments, 1);
        return fn.apply(null, args);
    } catch (e) {
        try { console.warn('[safeCall] ' + e); } catch (_) {}
        return null;
    }
}
function inR(p) {
    if (!p) return false;
    try {
        if (typeof p.isNull === 'function' && p.isNull()) return false;
        p.readU8(0);
        return true;
    } catch (e) {
        return false;
    }
}
function strPtr(s) {
    return Memory.allocUtf8String(String(s || ''));
}
function scPtr(s) {
    return safeCall(function () {
        if (!malloc || !stringCtor) return strPtr(s);
        const buf = malloc(0xDB80);
        if (!isValidPtr(buf)) return strPtr(s);
        stringCtor(buf, strPtr(String(s || '')));
        return buf;
    });
}
function setVisible(obj, val) {
    if (!isValidPtr(obj)) return;
    try { obj.add(OFF_DO_VISIBLE).writeU8(val ? 1 : 0); } catch (e) {}
}
function safeSetScale(objPtr, scaleY, scaleX) {
    if (!isValidPtr(objPtr)) return;
    if (typeof scaleX === 'undefined') scaleX = scaleY;
    if (isNaN(scaleY) || !isFinite(scaleY)) return;
    if (isNaN(scaleX) || !isFinite(scaleX)) return;
    try {
        objPtr.add(OFF_DO_SCALE_X).writeFloat(scaleX);
        objPtr.add(OFF_DO_SCALE_Y).writeFloat(scaleY);
    } catch (e) {}
}
function setXYSafe(obj, x, y) {
    if (!isValidPtr(obj)) return;
    const rx = Math.round(Number(x) || 0);
    const ry = Math.round(Number(y) || 0);
    if (DisplayObject_setPixelSnappedXY) {
        try { DisplayObject_setPixelSnappedXY(obj, rx, ry); } catch (e) {}
    } else if (DisplayObject_setXY) {
        try { DisplayObject_setXY(obj, rx, ry); } catch (e) {}
    }
}
function bringToFront(obj) {
    if (!isValidPtr(obj)) return false;
    const dest = STAGE_PTR;
    if (!isValidPtr(dest)) return false;
    try { if (DisplayObject_removeFromParent) DisplayObject_removeFromParent(obj); } catch (e) {}
    try { if (Stage_addChild) Stage_addChild(dest, obj); } catch (e) {}
    return true;
}
function sendPacket(packet) {
    if (!isValidPtr(MessageManagerPtr)) return;
    try {
        const messager = MessageManagerPtr.readPointer();
        if (!isValidPtr(messager)) return;
        const vtable = messager.readPointer();
        if (!isValidPtr(vtable)) return;
        const fnPtr = vtable.add(Process.pointerSize).readPointer();
        if (!isValidPtr(fnPtr)) return;
        const fn = new NativeFunction(fnPtr, 'long', ['pointer', 'pointer']);
        fn(messager, packet);
    } catch (e) {}
}
function getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
function distance(x1, y1, x2, y2) { return getDistance(x1, y1, x2, y2); }
function degToRad(d) { return d * Math.PI / 180; }
function wrap360(d) { return ((d % 360) + 360) % 360; }
function angleDeltaDeg(a, b) {
    let diff = Math.abs(a - b) % 360;
    if (diff > 180) diff = 360 - diff;
    return diff;
}
function packWorldKey(x, y) {
    const qx = Math.round(x * 100000);
    const qy = Math.round(y * 100000);
    return qx + ':' + qy;
}
function packPointKey(x, y, extra) {
    const qx = Math.round(x * 100000);
    const qy = Math.round(y * 100000);
    if (extra === undefined || extra === null) return qx + ':' + qy;
    return qx + ':' + qy + ':' + extra;
}
function worldToTile(x, y) {
    return { x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) };
}
function circleIntersectsSquare(cx, cy, r, x0, y0, x1, y1) {
    const closestX = Math.max(x0, Math.min(cx, x1));
    const closestY = Math.max(y0, Math.min(cy, y1));
    const dx = cx - closestX, dy = cy - closestY;
    return (dx * dx + dy * dy) <= (r * r);
}
function pointToSegmentDistSq(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq < 1e-10) {
        const ddx = px - ax;
        const ddy = py - ay;
        return ddx * ddx + ddy * ddy;
    }
    let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
    if (t < 0) t = 0; else if (t > 1) t = 1;
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    const ddx = px - cx;
    const ddy = py - cy;
    return ddx * ddx + ddy * ddy;
}
function rayCircleHitInterval(px, py, vx, vy, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    const a  = vx * vx + vy * vy;
    const c  = dx * dx + dy * dy - radius * radius;
    if (a < 1e-10) {
        return c <= 0 ? { t0: 0, t1: Infinity } : null;
    }
    const b = 2 * (dx * vx + dy * vy);
    const disc = b * b - 4 * a * c;
    if (disc < 0) return null;
    const sq = Math.sqrt(disc);
    let t0 = (-b - sq) / (2 * a);
    let t1 = (-b + sq) / (2 * a);
    if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
    return { t0: t0, t1: t1 };
}
function currentPlayerRadius() {
    if (state && typeof state.myRadius === 'number' && state.myRadius > 0) {
        return state.myRadius;
    }
    return 360;
}
function currentPlayerSpeed() {
    if (state && typeof state.mySpeed === 'number' && state.mySpeed > 0) {
        return state.mySpeed;
    }
    return 720;
}
function scaledLookahead(unitsAt720) {
    const v = currentPlayerSpeed();
    if (v <= 0) return unitsAt720;
    return unitsAt720 * (v / 720);
}
function mirror() {
    return (state && state.isMirrored) ? -1 : 1;
}
function getProjectileRange(skillName) {
    const e = SKILL_DB[skillName];
    if (e && typeof e.CastingRange === 'number') return e.CastingRange;
    return DEFAULT_RANGE;
}
function getProjectileSpread(skillName) {
    const e = SKILL_DB[skillName];
    if (e && typeof e.Spread === 'number') return e.Spread;
    return 0;
}
function getInsideCapsuleIgnoredProjectileReason(p) {
    if (p === null || p === undefined) return '<null>';
    if (typeof p === 'string') {
        const range = getProjectileRange(p);
        if (range < AUTO_DODGE_MIN_RANGE) return 'range';
        const spread = getProjectileSpread(p);
        if (spread > AUTO_DODGE_MAX_SPREAD) return 'spread';
        return null;
    }
    if (typeof p.range === 'number' && p.range < AUTO_DODGE_MIN_RANGE) return 'range';
    if (typeof p.spread === 'number' && p.spread > AUTO_DODGE_MAX_SPREAD) return 'spread';
    if (AUTO_DODGE_IGNORE_THROWERS && p.isThrower) return 'thrower';
    return null;
}
const AIM_PRIMITIVES = (function () {
    function getHealthPercent(character) {
        if (!isValidPtr(character)) return 0;
        try {
            const curHp = character.add(0xAC).readS32();
            const maxHp = character.add(0xB0).readS32();
            if (maxHp <= 0) return 0;
            return Math.round((curHp / maxHp) * 100);
        } catch (e) { return 0; }
    }
    function makeIsWallAt(getMapCache, getMapDims) {
        const TS = 300;
        return function isWallAt(worldX, worldY) {
            const cache = getMapCache();
            if (!cache) return true;
            const dims = getMapDims();
            const cols = dims.cols, rows = dims.rows;
            if (cols <= 0 || rows <= 0) return true;
            const tx = Math.floor(worldX / TS);
            const ty = Math.floor(worldY / TS);
            if (tx < 0 || ty < 0 || tx >= cols || ty >= rows) return true;
            return cache[tx + ty * cols] !== 0;
        };
    }
    function makeHasWallBetween(isWallAt) {
        return function hasWallBetween(x1, y1, x2, y2 ) {
            const dist = getDistance(x1, y1, x2, y2);
            if (dist <= 0) return false;
            let steps = Math.floor(dist / 150);
            if (steps < 2)   steps = 2;
            if (steps > 130) steps = 130;
            const dx = (x2 - x1) / steps;
            const dy = (y2 - y1) / steps;
            for (let i = 0; i <= steps; i++) {
                const sx = Math.round(x1 + dx * i);
                const sy = Math.round(y1 + dy * i);
                if (isWallAt(sx, sy)) return true;
            }
            return false;
        };
    }
    function makeGetSkillRange(LogicSkillData_getCastingRange) {
        return function getSkillRange(skill) {
            if (!isValidPtr(skill)) return undefined;
            try { return LogicSkillData_getCastingRange(skill); }
            catch (e) { return undefined; }
        };
    }
    function makeGetRangeFromSkillServer(LogicSkillData_getCastingRange) {
        return function getRangeFromSkillServer(skillServer) {
            if (!isValidPtr(skillServer)) return 0;
            try {
                const skillData = skillServer.readPointer();
                if (!isValidPtr(skillData)) return 0;
                return LogicSkillData_getCastingRange(skillData);
            } catch (e) { return 0; }
        };
    }
    function makeIsInRange(getRangeCheckFlag) {
        return function isInRange(ownX, ownY, targetX, targetY, range, minDist) {
            if (!getRangeCheckFlag()) return true;
            const dist = getDistance(ownX, ownY, targetX, targetY);
            return dist <= (range + minDist);
        };
    }
    return {
        getHealthPercent:          getHealthPercent,
        makeIsWallAt:              makeIsWallAt,
        makeHasWallBetween:        makeHasWallBetween,
        makeGetSkillRange:         makeGetSkillRange,
        makeGetRangeFromSkillServer: makeGetRangeFromSkillServer,
        makeIsInRange:             makeIsInRange,
    };
})();
const tileCache = {
    mapPtr:        null,
    width:         undefined,
    height:        undefined,
    walk:          null,
    bullet:        null,
    moveForbidden: null,
    dirty:         false,
    lastRefreshAt: 0,
    stamp:         null,
};
function markTileCacheDirty() {
    tileCache.dirty = true;
}
function _getTileXYNative(mapPtr, tx, ty) {
    if (!state.natives || !state.natives.getTileXY) return NULL;
    try { return state.natives.getTileXY(mapPtr, tx, ty); }
    catch (e) { return NULL; }
}
function updateTileCacheCell(tx, ty) {
    if (!logicTileMap || logicTileMap.isNull()) return;
    const W = tileCache.width;
    const H = tileCache.height;
    if (W === undefined || H === undefined) return;
    if (tx < 0 || ty < 0 || tx >= W || ty >= H) return;
    const tile = _getTileXYNative(logicTileMap, tx, ty);
    if (!isValidPtr(tile)) return;
    let specialMove = 0, walkPass = 1, bulletPass = 1;
    try { specialMove = tile.add(TILE_SPECIAL_MOVE_BLOCK).readU8() & 1; } catch (_) {}
    try {
        if (state.natives.blocksMovement)    walkPass   = state.natives.blocksMovement(tile)    ? 0 : 1;
        if (state.natives.blocksProjectiles) bulletPass = state.natives.blocksProjectiles(tile) ? 0 : 1;
    } catch (_) {}
    const idx     = ty * W + tx;
    const word    = idx >> 6;
    const bit     = BigInt(idx & 63);
    const mask    = 1n << bit;
    const clear   = ~mask;
    tileCache.walk[word]          = (tileCache.walk[word]          & clear) | (BigInt(walkPass)   << bit);
    tileCache.bullet[word]        = (tileCache.bullet[word]        & clear) | (BigInt(bulletPass) << bit);
    tileCache.moveForbidden[word] = (tileCache.moveForbidden[word] & clear) | (BigInt(specialMove) << bit);
}
function rebuildTileCache(now) {
    if (!logicTileMap || logicTileMap.isNull()) return;
    const ptr = logicTileMap;
    tileCache.mapPtr        = ptr;
    tileCache.dirty         = false;
    tileCache.lastRefreshAt = now;
    let W, H;
    try {
        W = ptr.add(OFF_TM_WIDTH).readS32();
        H = ptr.add(OFF_TM_HEIGHT).readS32();
    } catch (e) { W = 0; H = 0; }
    if (W <= 0 || W > TILEMAP_WIDTH)  W = TILEMAP_WIDTH;
    if (H <= 0 || H > TILEMAP_HEIGHT) H = TILEMAP_HEIGHT;
    const nWords = Math.max(1, Math.ceil((W * H) / 64));
    tileCache.width         = W;
    tileCache.height        = H;
    tileCache.walk          = new BigUint64Array(nWords);
    tileCache.bullet        = new BigUint64Array(nWords);
    tileCache.moveForbidden = new BigUint64Array(nWords);
    for (let ty = 0; ty < H; ty++) {
        for (let tx = 0; tx < W; tx++) {
            const tile = _getTileXYNative(ptr, tx, ty);
            if (!isValidPtr(tile)) continue;
            let specialMove = 0;
            let walkPass    = 1n;
            let bulletPass  = 1n;
            try {
                specialMove = tile.add(TILE_SPECIAL_MOVE_BLOCK).readU8() & 1;
                if (state.natives.blocksMovement)
                    walkPass = state.natives.blocksMovement(tile) ? 0n : 1n;
                if (state.natives.blocksProjectiles)
                    bulletPass = state.natives.blocksProjectiles(tile) ? 0n : 1n;
            } catch (_) {}
            const idx  = ty * W + tx;
            const word = idx >> 6;
            const bit  = BigInt(idx & 63);
            tileCache.walk[word]          |= walkPass             << bit;
            tileCache.bullet[word]        |= bulletPass           << bit;
            tileCache.moveForbidden[word] |= BigInt(specialMove)  << bit;
            tileToXY[idx] = { x: tx, y: ty };
        }
    }
    if (state && state.activeProjectiles) {
        for (const p of state.activeProjectiles.values()) {
            p.clipReady = false;
        }
    }
}
function refreshTileCacheIfNeeded(now) {
    if (!logicTileMap || logicTileMap.isNull()) return;
    let need = false;
    if (tileCache.dirty)                                          need = true;
    else if (tileCache.lastRefreshAt === 0)                       need = true;
    else if (tileCache.width  === undefined)                      need = true;
    else if (tileCache.height === undefined)                      need = true;
    else if (!tileCache.mapPtr || tileCache.mapPtr.isNull())      need = true;
    else if (!tileCache.mapPtr.equals(logicTileMap))              need = true;
    else if (!tileCache.walk)                                     need = true;
    else if (!tileCache.bullet)                                   need = true;
    else if (!tileCache.moveForbidden)                            need = true;
    if (need) rebuildTileCache(now);
}
function ensureTileCache() {
    refreshTileCacheIfNeeded(Date.now());
}
function ensureTileCacheFast() {
    if (!logicTileMap || logicTileMap.isNull()) return;
    if (tileCache.dirty)                    rebuildTileCache(Date.now());
    else if (tileCache.lastRefreshAt === 0) rebuildTileCache(Date.now());
    else if (!tileCache.walk)               rebuildTileCache(Date.now());
}
function rawCanWalkTile(tx, ty) {
    const W = tileCache.width, H = tileCache.height;
    if (W === undefined || H === undefined) return false;
    if (tileCache.dirty) return true;
    if (tx < 0 || ty < 0 || tx >= W || ty >= H) return false;
    const idx = ty * W + tx;
    return ((tileCache.walk[idx >> 6] >> BigInt(idx & 63)) & 1n) === 1n;
}
function rawCanBulletPassTile(tx, ty) {
    const W = tileCache.width, H = tileCache.height;
    if (W === undefined || H === undefined) return false;
    if (tileCache.dirty) return true;
    if (tx < 0 || ty < 0 || tx >= W || ty >= H) return false;
    const idx = ty * W + tx;
    return ((tileCache.bullet[idx >> 6] >> BigInt(idx & 63)) & 1n) === 1n;
}
function rawCanMoveTile(tx, ty) {
    const W = tileCache.width, H = tileCache.height;
    if (W === undefined || H === undefined) return false;
    if (tileCache.dirty) return true;
    if (tx < 0 || ty < 0 || tx >= W || ty >= H) return false;
    const idx = ty * W + tx;
    const forbidden = ((tileCache.moveForbidden[idx >> 6] >> BigInt(idx & 63)) & 1n) === 1n;
    return !forbidden && rawCanWalkTile(tx, ty);
}
function canBulletPassTile(tx, ty) {
    if (!PROJECTILE_WALL_CLIPPING_ENABLED) return true;
    ensureTileCacheFast();
    return rawCanBulletPassTile(tx, ty);
}
function tileChar(tx, ty) {
    const w = tileCache.width;
    const h = tileCache.height;
    if (!w || !h) return 'X';
    if (tx < 0 || ty < 0 || tx >= w || ty >= h) return 'X';
    const walk   = rawCanWalkTile(tx, ty);
    const bullet = rawCanBulletPassTile(tx, ty);
    if (!walk && !bullet) return '#';
    if (!walk)            return 'M';
    if (!bullet)          return 'W';
    return '.';
}
function dumpLocalMap(radiusTiles) {
    const W = tileCache.width, H = tileCache.height;
    if (!W || !H) return '';
    const radius = Math.max(0, radiusTiles | 0) || 6;
    const center = worldToTile(state.myPosX, state.myPosY);
    const startX = Math.max(0, center.x - radius);
    const endX   = Math.min(W - 1, center.x + radius);
    const startY = Math.max(0, center.y - radius);
    const endY   = Math.min(H - 1, center.y + radius);
    const lines = [];
    for (let ty = startY; ty <= endY; ty++) {
        let line = '';
        for (let tx = startX; tx <= endX; tx++) line += tileChar(tx, ty);
        lines.push(line);
    }
    return lines.join('\n');
}
function tileMapInfo() {
    ensureTileCache();
    if (!tileCache.width || !tileCache.height) return null;
    return {
        mapPtr: tileCache.mapPtr,
        width:  tileCache.width,
        height: tileCache.height,
    };
}
function joystickIsOn(v4ptr) {
    if (!v4ptr || (v4ptr.isNull && v4ptr.isNull())) return false;
    try {
        return v4ptr.add(OFF_SKILL_STATE).readU16() !== 0;
    } catch (e) { return false; }
}
function joystickVector(v4ptr) {
    if (!v4ptr || (v4ptr.isNull && v4ptr.isNull())) return null;
    try {
        const ax = v4ptr.add(OFF_SKILL_AX).readFloat();
        const bx = v4ptr.add(OFF_SKILL_BX).readFloat();
        const ay = v4ptr.add(OFF_SKILL_AY).readFloat();
        const by = v4ptr.add(OFF_SKILL_BY).readFloat();
        const mode = v4ptr.add(OFF_SKILL_MODE).readU32();
        if (mode !== 2 && mode !== 3) return null;
        const dx = ax - bx;
        const dy = ay - by;
        const c  = v4ptr.add(OFF_SKILL_AB).readFloat();
        const s  = v4ptr.add(OFF_SKILL_AA).readFloat();
        const rx = dx * c + dy * s;
        const ry = dy * c - dx * s;
        const len = Math.hypot(rx, ry);
        if (len < 0.001) return null;
        const m = mirror();
        return { x: (m * rx) / len, y: -ry / len };
    } catch (e) { return null; }
}
function joystickAngleWorld(v4ptr) {
    const v = joystickVector(v4ptr);
    if (!v) return null;
    return wrap360(Math.atan2(v.y, v.x) * 180 / Math.PI);
}
function getProjectileEndpoint(p) {
    return {
        ex: p.startX + p.range * p.dirX,
        ey: p.startY + p.range * p.dirY,
    };
}
let clipProjectileToWalls = function (ax, ay, bx, by, info) {
    if (!info) info = { x: bx, y: by, blocked: false, bigdecimal: null };
    info.x = bx; info.y = by;
    info.blocked = false; info.bigdecimal = null;
    return info;
};
function ensureProjectileClip(p) {
    if (p.clipReady) return p;
    const end = getProjectileEndpoint(p);
    const clipped = clipProjectileToWalls(p.startX, p.startY, end.ex, end.ey, {});
    p.clipX = clipped.x;
    p.clipY = clipped.y;
    p.clipBlocked = clipped.blocked;
    p.clipBlockedReason = clipped.bigdecimal || clipped.reason || null;
    if (p.clipBlocked) {
        const clipTravel = Math.hypot(p.clipX - p.startX, p.clipY - p.startY);
        p.clipTravel = clipTravel;
        const newLifeMs = Math.min(MAX_LIFETIME_MS,
                            Math.max(MIN_LIFETIME_MS,
                              Math.max(0, clipTravel / Math.max(1, p.speed) * 1000)));
        if (newLifeMs < p.lifetimeMs) p.lifetimeMs = newLifeMs;
        p.range = clipTravel;
    }
    p.clipReady = true;
    return p;
}
function notifyBlockedProjectile(p) {
    if (!p || p.clipLogged) return;
    if (!p.clipBlocked) return;
    p.clipLogged = true;
    try {
        console.log('[dodge] projectile gid=' + p.globalID +
            ' clipped reason=' + p.clipBlockedReason +
            ' newRange=' + p.range);
    } catch (_) {}
}
function getProjectileCurrentStart(p, now) {
    const key = p.globalID;
    if (frameProjectileStartMemo.has && frameProjectileStartMemo.has(key)) {
        return frameProjectileStartMemo.get(key);
    }
    const elapsedSec = Math.max(0, (now - (p.spawnTime || p.spawnTimeMs || 0)) / 1000);
    let traveled = elapsedSec * p.speed;
    let maxTravel = Math.min(p.range, (p.lifetimeMs * p.speed) / 1000);
    if (p.clipReady && p.clipBlocked) {
        const clipTravel = Math.hypot(p.clipX - p.startX, p.clipY - p.startY);
        if (traveled >= clipTravel - 1e-06) {
            const cur = { cx: p.clipX, cy: p.clipY };
            if (frameProjectileStartMemo.set) frameProjectileStartMemo.set(key, cur);
            return cur;
        }
        maxTravel = Math.min(maxTravel, clipTravel);
    }
    traveled = Math.min(traveled, maxTravel);
    const cur = {
        cx: p.startX + traveled * p.dirX,
        cy: p.startY + traveled * p.dirY,
    };
    if (frameProjectileStartMemo.set) frameProjectileStartMemo.set(key, cur);
    return cur;
}
function beginFrameMemo(frameId) {
    if (frameMemoStamp === frameId) return;
    frameMemoStamp           = frameId;
    framePointMemo           = new Map();
    frameThreatMemo          = new Map();
    frameClearanceMemo       = new Map();
    frameProjectileStartMemo = new Map();
    frameEngineMemo          = new Map();
    frameWalkMemo            = new Map();
    frameAngleSafetyMemo     = new Map();
}
const _IChildArray_off = 0xB0;
const _ChildArray_off  = 0x10;
function getChildClip(parent, name) {
    if (!isValidPtr(parent) || !MovieClip_getChildByName) return null;
    const p = safeCall(MovieClip_getChildByName, parent, strPtr(name));
    return isValidPtr(p) ? p : null;
}
function findChildDeep(parent, name, maxDepth) {
    if (maxDepth === undefined) maxDepth = 6;
    if (maxDepth < 0 || !isValidPtr(parent)) return null;
    const direct = getChildClip(parent, name);
    if (direct) return direct;
    try {
        const arrPtr = parent.add(_IChildArray_off).readPointer();
        if (!isValidPtr(arrPtr)) return null;
        const count = arrPtr.add(0x08).readU32();
        const elems = arrPtr.add(_ChildArray_off).readPointer();
        for (let i = 0; i < count; i++) {
            const child = elems.add(i * 8).readPointer();
            const hit = findChildDeep(child, name, maxDepth - 1);
            if (hit) return hit;
        }
    } catch (_) {}
    return null;
}
function findTextFieldDeep(parent, name, maxDepth) {
    if (maxDepth === undefined) maxDepth = 6;
    if (maxDepth < 0 || !isValidPtr(parent) || !MovieClip_getTextFieldByName) return null;
    const direct = safeCall(MovieClip_getTextFieldByName, parent, strPtr(name));
    if (isValidPtr(direct)) return direct;
    try {
        const arrPtr = parent.add(_IChildArray_off).readPointer();
        if (!isValidPtr(arrPtr)) return null;
        const count = arrPtr.add(0x08).readU32();
        const elems = arrPtr.add(_ChildArray_off).readPointer();
        for (let i = 0; i < count; i++) {
            const child = elems.add(i * 8).readPointer();
            const hit = findTextFieldDeep(child, name, maxDepth - 1);
            if (hit) return hit;
        }
    } catch (_) {}
    return null;
}
function _findTextFieldAnywhere(rootOrNames, names) {
    if (Array.isArray(rootOrNames)) {
        for (let i = 0; i < rootOrNames.length; i++) {
            const tf = findTextFieldDeep(STAGE_PTR, rootOrNames[i], 12);
            if (isValidPtr(tf)) return tf;
        }
        return null;
    }
    const root = rootOrNames;
    if (!isValidPtr(root) || !names || !names.length) return null;
    for (let i = 0; i < names.length; i++) {
        const tf = safeCall(MovieClip_getTextFieldByName, root, strPtr(names[i]));
        if (isValidPtr(tf)) return tf;
    }
    for (let i = 0; i < names.length; i++) {
        const tf = findTextFieldDeep(root, names[i], 6);
        if (isValidPtr(tf)) return tf;
    }
    return null;
}
function hideChildByName(parent, name) {
    if (!isValidPtr(parent)) return;
    const ch = getChildClip(parent, name);
    if (!isValidPtr(ch)) return;
    if (typeof setInteractive === 'function') setInteractive(ch, false);
    if (DisplayObject_removeFromParent) {
        try { DisplayObject_removeFromParent(ch); } catch (e) {}
    }
    setVisible(ch, 0);
}
function _asDisplayObject(p) {
    const mapped = BUTTON_TO_CLIP.get(p && p.toString ? p.toString() : p);
    if (mapped) return mapped;
    return isValidPtr(p) ? p : null;
}
asDisplayObject = _asDisplayObject;
function _setInteractive(clip, on) {
    if (!isValidPtr(clip)) return;
    const key = clip.toString();
    try {
        if (setInteractiveRecursive) setInteractiveRecursive(clip, on ? 1 : 0);
    } catch (e) {}
    if (on) NON_CLICKABLE_PTRS.delete(key);
    else    NON_CLICKABLE_PTRS.add(key);
}
setInteractive = _setInteractive;
function readScString(stringPtr) {
    if (!isValidPtr(stringPtr)) return null;
    try {
        const len = stringPtr.readInt();
        if (len >= 0 && len < 0x80) {
            return stringPtr.add(1).readUtf8String(len);
        }
        return stringPtr.add(8).readPointer().readUtf8String();
    } catch (e) {
        return null;
    }
}
function hashTagToId(hashtag, useTeamChars) {
    const CHARSET_PLAYER = '0289PYLQGRJCUV';
    const CHARSET_TEAM   = 'PYLQGRJCUV0289';
    const CHARSET = useTeamChars ? CHARSET_TEAM : CHARSET_PLAYER;
    if (typeof hashtag !== 'string') return null;
    let s = hashtag.trim();
    if (s.charAt(0) === '#') s = s.substring(1);
    s = s.toUpperCase();
    if (s.length === 0) return null;
    const N = BigInt(CHARSET.length);
    let id = 0n;
    for (let i = 0; i < s.length; i++) {
        const idx = CHARSET.indexOf(s.charAt(i));
        if (idx < 0) return null;
        id = id * N + BigInt(idx);
    }
    const hi = Number((id >> 32n) & 0xFFFFFFFFn);
    const lo = Number(id & 0xFFFFFFFFn);
    return { hi: hi, lo: lo, raw: id };
}
function extractTypedTag(rawTag) {
    if (rawTag === null || rawTag === undefined) return null;
    let s;
    if (typeof rawTag === 'string') s = rawTag;
    else if (rawTag && typeof rawTag.readUtf8String === 'function')
        s = rawTag.readUtf8String();
    else s = String(rawTag);
    s = (s || '').trim().toUpperCase();
    if (s.length === 0) return null;
    let type = 'player';
    let i = 0;
    if (s.charAt(0) === 'P' && s.charAt(1) === '#') { type = 'player'; i = 2; }
    else if (s.charAt(0) === 'C' && s.charAt(1) === '#') { type = 'club'; i = 2; }
    else if (s.charAt(0) === '#') { i = 1; }
    else if (/^\d+$/.test(s)) {
        const n = parseInt(s, 10);
        return Number.isFinite(n) ? { type: 'player', id: n } : null;
    }
    const tagId = hashTagToId(s.substring(i));
    if (!tagId) return null;
    return { type: type, id: tagId };
}
function sendSpectateByTag(tag, useBrawlTV) {
    const info = extractTypedTag(tag);
    if (!info) {
        try { console.warn('[spectate] could not parse tag: ' + tag); } catch (_) {}
        return false;
    }
    if (!operator_new) return false;
    const mem = operator_new(0x40);
    if (!isValidPtr(mem)) return false;
    try { if (memset) memset(mem, 0, 0x40); } catch (e) {}
    try {
        if (StartSpectateMessage_StartSpectateMessage) {
            StartSpectateMessage_StartSpectateMessage(mem, strPtr(tag || ''), NULL, useBrawlTV ? 1 : 0);
        }
    } catch (e) {}
    try {
        const idVal = info.id.raw || info.id;
        if (typeof idVal === 'bigint') {
            mem.add(0x18).writeU64(idVal);
        } else if (typeof idVal === 'number') {
            mem.add(0x18).writeU64(idVal >>> 0);
        }
        mem.add(0x20).writeU8(useBrawlTV ? 1 : 0);
    } catch (e) {}
    sendPacket(mem);
    return true;
}
clipProjectileToWalls = function clipProjectileToWallsImpl(ax, ay, bx, by, info) {
    if (!info) {
        info = { x: bx, y: by, blocked: false, bigdecimal: null };
    }
    if (!PROJECTILE_WALL_CLIPPING_ENABLED) {
        info.x = bx; info.y = by;
        info.blocked = false; info.bigdecimal = null;
        return info;
    }
    const dx = bx - ax, dy = by - ay;
    const dist = Math.hypot(dx, dy);
    if (dist < 1e-06) {
        info.x = bx; info.y = by;
        info.blocked = false; info.bigdecimal = null;
        return info;
    }
    ensureTileCacheFast();
    const W = tileCache.width, H = tileCache.height;
    if (W === undefined || H === undefined) {
        info.x = bx; info.y = by;
        info.blocked = false; info.bigdecimal = null;
        return info;
    }
    const sa = worldToTile(ax, ay);
    const sb = worldToTile(bx, by);
    if (sa.x < 0 || sa.y < 0 || sa.x >= W || sa.y >= H) {
        info.x = ax; info.y = ay;
        info.blocked = true; info.bigdecimal = 'world_border';
        return info;
    }
    const stepX = dx > 0 ? 1 : (dx < 0 ? -1 : 0);
    const stepY = dy > 0 ? 1 : (dy < 0 ? -1 : 0);
    const nextBoundaryX = (stepX > 0 ? (sa.x + 1) : sa.x) * TILE_SIZE;
    const nextBoundaryY = (stepY > 0 ? (sa.y + 1) : sa.y) * TILE_SIZE;
    let tMaxX = (dx !== 0) ? (nextBoundaryX - ax) / dx : Infinity;
    let tMaxY = (dy !== 0) ? (nextBoundaryY - ay) / dy : Infinity;
    const tDeltaX = (dx !== 0) ? Math.abs(TILE_SIZE / dx) : Infinity;
    const tDeltaY = (dy !== 0) ? Math.abs(TILE_SIZE / dy) : Infinity;
    let tx = sa.x, ty = sa.y;
    const maxSteps = 2 * (W + H);
    let steps = 0;
    while ((tx !== sb.x || ty !== sb.y) && steps++ < maxSteps) {
        if (tMaxX < tMaxY) {
            tx += stepX;
            if (tx < 0 || ty < 0 || tx >= W || ty >= H) {
                info.x = ax + dx * tMaxX;
                info.y = ay + dy * tMaxX;
                info.blocked = true; info.bigdecimal = 'world_border';
                return info;
            }
            if (!canBulletPassTile(tx, ty)) {
                info.x = ax + dx * tMaxX;
                info.y = ay + dy * tMaxX;
                info.blocked = true; info.bigdecimal = 'wall';
                return info;
            }
            tMaxX += tDeltaX;
        } else {
            ty += stepY;
            if (tx < 0 || ty < 0 || tx >= W || ty >= H) {
                info.x = ax + dx * tMaxY;
                info.y = ay + dy * tMaxY;
                info.blocked = true; info.bigdecimal = 'world_border';
                return info;
            }
            if (!canBulletPassTile(tx, ty)) {
                info.x = ax + dx * tMaxY;
                info.y = ay + dy * tMaxY;
                info.blocked = true; info.bigdecimal = 'wall';
                return info;
            }
            tMaxY += tDeltaY;
        }
    }
    info.x = bx; info.y = by;
    info.blocked = false; info.bigdecimal = null;
    return info;
};
function resolveMoveTargetWithGame(targetX, targetY) {
    const memoKey = packPointKey(targetX, targetY);
    if (frameEngineMemo.has(memoKey)) {
        return frameEngineMemo.get(memoKey);
    }
    if (!state.natives || !state.natives.getClosestAnyCollision) {
        const ok = { x: targetX | 0, y: targetY | 0 };
        frameEngineMemo.set(memoKey, ok);
        return ok;
    }
    const engineCollisionScratch = state.engineCollisionScratch;
    if (!engineCollisionScratch) {
        const ok = { x: targetX | 0, y: targetY | 0 };
        frameEngineMemo.set(memoKey, ok);
        return ok;
    }
    try {
        const out = Memory.alloc(10760);
        out.writeS32(targetX | 0);
        out.add(4).writeS32(targetY | 0);
        state.natives.getClosestAnyCollision(
            state.myPosX | 0,
            state.myPosY | 0,
            targetX | 0,
            targetY | 0,
            out,
            engineCollisionScratch,
            state.isMirrored ? 1 : 0,
            8 
        );
        const resX = out.add(0).readS32();
        const resY = out.add(4).readS32();
        const requested = { x: targetX | 0, y: targetY | 0 };
        const moved = Math.abs(resX - requested.x) > 1 || Math.abs(resY - requested.y) > 1;
        const result = moved
            ? { x: resX, y: resY, _unkBlocked: true }
            : { x: resX, y: resY };
        frameEngineMemo.set(memoKey, result);
        return result;
    } catch (e) {
        const fallback = { x: targetX | 0, y: targetY | 0 };
        frameEngineMemo.set(memoKey, fallback);
        return fallback;
    }
}
function isValidDodgePoint(x, y, radiusPadding) {
    const pad = Math.max(0, radiusPadding || 0);
    const memoKey = packPointKey(x, y, pad);
    if (framePointMemo.has(memoKey)) return framePointMemo.get(memoKey);
    const width = tileCache.width;
    const height = tileCache.height;
    if (!width || !height || tileCache.dirty) {
        framePointMemo.set(memoKey, true);
        return true;
    }
    const r = Math.max(0, currentPlayerRadius() + pad);
    const maxX = (width  - 1) * TILE_SIZE + TILE_SIZE;
    const maxY = (height - 1) * TILE_SIZE + TILE_SIZE;
    if (x - r < 0 || y - r < 0 || x + r > maxX || y + r > maxY) {
        framePointMemo.set(memoKey, false);
        return false;
    }
    const minTx = Math.floor((x - r) / TILE_SIZE);
    const maxTx = Math.floor((x + r) / TILE_SIZE);
    const minTy = Math.floor((y - r) / TILE_SIZE);
    const maxTy = Math.floor((y + r) / TILE_SIZE);
    for (let ty = minTy; ty <= maxTy; ty++) {
        for (let tx = minTx; tx <= maxTx; tx++) {
            if (tx < 0 || ty < 0 || tx >= width || ty >= height) continue;
            if (rawCanMoveTile(tx, ty)) continue;
            const x0 = tx * TILE_SIZE;
            const y0 = ty * TILE_SIZE;
            const x1 = x0 + TILE_SIZE;
            const y1 = y0 + TILE_SIZE;
            if (circleIntersectsSquare(x, y, r, x0, y0, x1, y1)) {
                framePointMemo.set(memoKey, false);
                return false;
            }
        }
    }
    const game = resolveMoveTargetWithGame(x, y);
    const ok = !!game;
    framePointMemo.set(memoKey, ok);
    return ok;
}
function isWallClearPath(px, py, tx, ty, radiusPadding) {
    const pad = Math.max(0, radiusPadding || 0);
    const dist = Math.hypot(tx - px, ty - py);
    const steps = Math.max(2, Math.ceil(dist / (TILE_SIZE * 0.5)));
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = px + (tx - px) * t;
        const y = py + (ty - py) * t;
        if (!isValidDodgePoint(x, y, pad)) return false;
    }
    return true;
}
let framePlayerRadius   = { myRadius: 0 };
let frameCache          = { stamp: -1, radius: 0, segments: [] };
let dodgeFrameCache     = { stamp: -1, radius: 0, segments: [] };
function refreshFrameCache(now) {
    if (frameCache.stamp === now && frameCache.radius === framePlayerRadius.myRadius) {
        return;
    }
    frameCache.stamp = now;
    frameCache.radius = framePlayerRadius.myRadius = currentPlayerRadius();
    const playerR = framePlayerRadius.myRadius;
    const segs = new Array(state.activeProjectiles.size);
    let segCount = 0;
    for (const p of state.activeProjectiles.values()) {
        ensureProjectileClip(p);
        if (p.clipBlocked) notifyBlockedProjectile(p);
        const cur = getProjectileCurrentStart(p, now);
        const remainingRange = Math.hypot(p.clipX - cur.cx, p.clipY - cur.cy);
        const inflated = (p.radius || 200) + playerR + SAFETY_MARGIN;
        segs[segCount++] = {
            ax: cur.cx, ay: cur.cy,
            bx: p.clipX, by: p.clipY,
            remainingRange: remainingRange,
            inflatedR: inflated,
            inflatedRSq: inflated * inflated,
            speed: p.speed,
            angle: p.angle,
            dirX: p.dirX, dirY: p.dirY,
        };
    }
    segs.length = segCount;
    frameCache.segments = segs;
}
function refreshDodgeFrameCache(now) {
    if (dodgeFrameCache.stamp === now && dodgeFrameCache.radius === framePlayerRadius.myRadius) {
        return;
    }
    dodgeFrameCache.stamp = now;
    dodgeFrameCache.radius = framePlayerRadius.myRadius = currentPlayerRadius();
    const playerR = framePlayerRadius.myRadius;
    const segs = new Array(state.activeProjectiles.size);
    let segCount = 0;
    for (const p of state.activeProjectiles.values()) {
        ensureProjectileClip(p);
        if (p.clipBlocked) notifyBlockedProjectile(p);
        const ax = p.startX, ay = p.startY;
        const bx = p.clipX,  by = p.clipY;
        const remainingRange = Math.hypot(bx - ax, by - ay);
        const inflated = (p.radius || 200) + playerR + SAFETY_MARGIN;
        segs[segCount++] = {
            ax: ax, ay: ay,
            bx: bx, by: by,
            remainingRange: remainingRange,
            inflatedR: inflated,
            inflatedRSq: inflated * inflated,
            speed: p.speed,
            angle: p.angle,
            dirX: p.dirX, dirY: p.dirY,
        };
    }
    segs.length = segCount;
    dodgeFrameCache.segments = segs;
}
function isPointThreatened(px, py) {
    const memoKey = packPointKey(px, py);
    if (frameThreatMemo.has(memoKey)) return frameThreatMemo.get(memoKey);
    const segs = frameCache.segments;
    for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        if (pointToSegmentDistSq(px, py, s.ax, s.ay, s.bx, s.by) <= s.inflatedRSq) {
            frameThreatMemo.set(memoKey, true);
            return true;
        }
    }
    frameThreatMemo.set(memoKey, false);
    return false;
}
function minClearanceFromBullets(px, py) {
    const memoKey = packPointKey(px, py);
    if (frameClearanceMemo.has(memoKey)) return frameClearanceMemo.get(memoKey);
    let minClear = Infinity;
    const segs = frameCache.segments;
    for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        const distSq = pointToSegmentDistSq(px, py, s.ax, s.ay, s.bx, s.by);
        const dist = Math.sqrt(distSq);
        const clearance = dist - s.inflatedR;
        if (clearance < minClear) minClear = clearance;
    }
    frameClearanceMemo.set(memoKey, minClear);
    return minClear;
}
function isPointThreatenedForDodge(px, py) {
    const memoKey = 'd:' + packPointKey(px, py);
    if (frameThreatMemo.has(memoKey)) return frameThreatMemo.get(memoKey);
    const segs = dodgeFrameCache.segments;
    for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        if (pointToSegmentDistSq(px, py, s.ax, s.ay, s.bx, s.by) <= s.inflatedRSq) {
            frameThreatMemo.set(memoKey, true);
            return true;
        }
    }
    frameThreatMemo.set(memoKey, false);
    return false;
}
function minClearanceFromBulletsForDodge(px, py) {
    const memoKey = 'd:' + packPointKey(px, py);
    if (frameClearanceMemo.has(memoKey)) return frameClearanceMemo.get(memoKey);
    let minClear = Infinity;
    const segs = dodgeFrameCache.segments;
    for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        const distSq = pointToSegmentDistSq(px, py, s.ax, s.ay, s.bx, s.by);
        const dist = Math.sqrt(distSq);
        const clearance = dist - s.inflatedR;
        if (clearance < minClear) minClear = clearance;
    }
    frameClearanceMemo.set(memoKey, minClear);
    return minClear;
}
function willPlayerWalkIntoBullet(px, py, dirX, dirY) {
    return willPlayerWalkIntoBulletDir(px, py, dirX, dirY, scaledLookahead(1));
}
function willPlayerWalkIntoBulletDir(px, py, dirX, dirY, travelUnits) {
    const qx = Math.round(dirX * 100000) / 100000;
    const qy = Math.round(dirY * 100000) / 100000;
    const memoKey = packPointKey(px, py, qx + ':' + qy + ':' + travelUnits);
    if (frameWalkMemo.has(memoKey)) return frameWalkMemo.get(memoKey);
    const playerSpeed = currentPlayerSpeed();
    const pvx = dirX * playerSpeed;
    const pvy = dirY * playerSpeed;
    const horizonSec = Math.max(0.001, travelUnits / Math.max(0.0001, playerSpeed));
    const playerRadius = framePlayerRadius.myRadius || currentPlayerRadius();
    const segs = frameCache.segments;
    for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        const bvx = s.dirX * s.speed;
        const bvy = s.dirY * s.speed;
        const rpx = s.ax - px;
        const rpy = s.ay - py;
        const rvx = bvx - pvx;
        const rvy = bvy - pvy;
        const closingRate = rpx * rvx + rpy * rvy;
        if (closingRate > 0) continue;  
        const rvSq = rvx * rvx + rvy * rvy;
        if (rvSq < 1e-10) continue;
        let t = -(rpx * rvx + rpy * rvy) / rvSq;
        if (t < 0) continue;
        if (t > horizonSec) continue;
        if (t > s.remainingRange / s.speed) continue;  
        const sepX = rpx + rvx * t;
        const sepY = rpy + rvy * t;
        const sepSq = sepX * sepX + sepY * sepY;
        const collisionR = s.inflatedR || (s.radius + playerRadius + SAFETY_MARGIN);
        if (sepSq <= collisionR * collisionR) {
            frameWalkMemo.set(memoKey, true);
            return true;
        }
    }
    frameWalkMemo.set(memoKey, false);
    return false;
}
function cachedAngleWalkSafety(px, py, dir, travelUnits) {
    const dirX = typeof dir === 'number' ? Math.cos(dir) : dir.x;
    const dirY = typeof dir === 'number' ? Math.sin(dir) : dir.y;
    const qx = Math.round(dirX * 100000) / 100000;
    const qy = Math.round(dirY * 100000) / 100000;
    const key = packPointKey(px, py, qx + ':' + qy + ':' + travelUnits);
    if (frameAngleSafetyMemo.has(key)) return frameAngleSafetyMemo.get(key);
    const unsafe = willPlayerWalkIntoBulletDir(px, py, dirX, dirY, travelUnits);
    frameAngleSafetyMemo.set(key, unsafe);
    return unsafe;
}
function candidateCmp(a, b) {
    if (a.dist !== b.dist) return a.dist - b.dist;
    return b.clearance - a.clearance;
}
function findSafeWalkAngle(px, py, desiredAngleDeg) {
    const desiredRad = degToRad(desiredAngleDeg);
    const desiredCos = Math.cos(desiredRad);
    const desiredSin = Math.sin(desiredRad);
    const scanLookahead = SAFE_WALK_LOOKUP_BASE * 1.5;
    if (!willPlayerWalkIntoBulletDir(px, py, desiredCos, desiredSin, scanLookahead)) {
        return desiredAngleDeg;
    }
    const scans = DodgeConfig.safeWalkScans;
    for (let i = 0; i < scans.length; i++) {
        const s = scans[i];
        const cwCos =  desiredCos * s.cos + desiredSin * s.sin;
        const cwSin = -desiredCos * s.sin + desiredSin * s.cos;
        if (!willPlayerWalkIntoBulletDir(px, py, cwCos, cwSin, scanLookahead)) {
            return wrap360(desiredAngleDeg + s.offset);
        }
        const ccwCos = desiredCos * s.cos - desiredSin * s.sin;
        const ccwSin = desiredCos * s.sin + desiredSin * s.cos;
        if (!willPlayerWalkIntoBulletDir(px, py, ccwCos, ccwSin, scanLookahead)) {
            return wrap360(desiredAngleDeg - s.offset);
        }
    }
    return null;
}
function findBestDodgeTarget(px, py, desiredAngleDeg) {
    const numAngles = DodgeConfig.numAngles;
    const step      = DodgeConfig.stepSize;
    const maxDist   = DodgeConfig.maxSearchDist;
    const dirs      = DodgeConfig.angleVectors;
    if (!dirs || dirs.length === 0) return null;
    let orderedDirs;
    if (desiredAngleDeg != null
        && typeof desiredAngleDeg === 'number'
        && isFinite(desiredAngleDeg)) {
        const base       = wrap360(desiredAngleDeg);
        const baseIndex  = Math.round(base / 360 * numAngles) % numAngles;
        const cacheKey   = baseIndex + ':' + numAngles;
        const cache = DodgeConfig[orderedDirsCache] || Object.create(null);
        orderedDirs = cache[cacheKey];
        if (!orderedDirs) {
            orderedDirs = new Array(numAngles);
            orderedDirs[0] = { x: dirs[baseIndex].x,
                               y: dirs[baseIndex].y,
                               offset: 0 };
            let idx = 1;
            for (let offset = 1; offset <= (numAngles >> 1); offset++) {
                const cw = (baseIndex + offset) % numAngles;
                if (idx < numAngles) {
                    orderedDirs[idx++] = { x: dirs[cw].x,
                                           y: dirs[cw].y,
                                           offset: offset };
                }
                const ccw = (baseIndex - offset + numAngles) % numAngles;
                if (idx < numAngles) {
                    orderedDirs[idx++] = { x: dirs[ccw].x,
                                           y: dirs[ccw].y,
                                           offset: -offset };
                }
            }
            cache[cacheKey] = orderedDirs;
            DodgeConfig[orderedDirsCache] = cache;
        }
    } else {
        orderedDirs = new Array(dirs.length);
        for (let i = 0; i < dirs.length; i++) {
            orderedDirs[i] = { x: dirs[i].x, y: dirs[i].y, offset: 0 };
        }
    }
    const candidates  = [];
    let   minSafeDist = Infinity;
    for (let i = 0; i < orderedDirs.length; i++) {
        const dir    = orderedDirs[i];
        const dirX   = dir.x;
        const dirY   = dir.y;
        let   dirBlocked = false;
        for (let d = step; d <= maxDist; d += step) {
            if (d > minSafeDist) break;
            const testX = px + dirX * d;
            const testY = py + dirY * d;
            if (!isValidDodgePoint(testX, testY, SAFETY_MARGIN)) {
                dirBlocked = true;
                break;
            }
            if (!isWallClearPath(px, py, testX, testY, WALL_PATH_PADDING)) {
                continue;
            }
            if (isPointThreatenedForDodge(testX, testY)) {
                continue;
            }
            candidates.push({ x: testX, y: testY, dist: d, clearance: 0 });
            if (d < minSafeDist) minSafeDist = d;
            break;
        }
    }
    if (candidates.length === 0) return null;
    for (let i = 0; i < candidates.length; i++) {
        const c = candidates[i];
        c.clearance = minClearanceFromBulletsForDodge(c.x, c.y);
    }
    candidates.sort(candidateCmp);
    return candidates[0];
}
let EXTEND_DEFAULT = 300; 
function joystickContinueTarget(v4ptr) {
    const v = joystickVector(v4ptr);
    if (!v) return null;
    const angle = wrap360(Math.atan2(v.y, v.x) * 180 / Math.PI);
    let useAngle;
    if (cachedAngleWalkSafety(state.myPosX, state.myPosY, v, SAFE_WALK_LOOKUP_BASE)) {
        useAngle = findSafeWalkAngle(state.myPosX, state.myPosY, angle);
        if (useAngle == null) return null;
    } else {
        useAngle = angle;
    }
    const rad = degToRad(useAngle);
    const x   = Math.round(state.myPosX + Math.cos(rad) * EXTEND_DEFAULT);
    const y   = Math.round(state.myPosY + Math.sin(rad) * EXTEND_DEFAULT);
    if (!isValidDodgePoint(x, y, 0)) return null;
    if (!isWallClearPath(state.myPosX, state.myPosY, x, y, WALL_PATH_PADDING)) return null;
    if (!resolveMoveTargetWithGame(x, y)) return null;
    return { x: x, y: y };
}
let _dodge_moving        = false;
let _dodge_moveX         = 0;
let _dodge_moveY         = 0;
let _dodge_startX        = 0;
let _dodge_startY        = 0;
let _dodge_releaseUntil  = 0;
let Inputs_enabled = false;
let Inputs_x       = 0;
let Inputs_y       = 0;
let Inputs_pos     = null;
let dangerDetectedAt   = 0;
let dangerDetectedX    = 0;
let dangerDetectedY    = 0;
let dangerDelayLogged  = false;
let seenGlobalIDs              = new Set();
let lastProjectileGlobalIDSeen = 0n;
function clearSubtilePath() {
    state.dodgeTargetX = state.myPosX;
    state.dodgeTargetY = state.myPosY;
}
function applyDodgeTarget(targetX, targetY) {
    state.dodgeTargetX = targetX;
    state.dodgeTargetY = targetY;
}
function trySetDodgeTarget(targetX, targetY) {
    return applyDodgeTarget(targetX, targetY);
}
function clearClientMove(v4ptr) {
    if (!isValidPtr(v4ptr)) return;
    try {
        const OFF_MOVE_TIMER   = state._dodge_off_move_timer    || 0;
        const OFF_SEND_COOL    = state._dodge_off_send_cooldown || 0;
        const OFF_MOVE_ACTIVE  = state._dodge_off_move_active   || 0;
        const OFF_LAST_X       = state._dodge_off_last_x        || 0;
        const OFF_LAST_Y       = state._dodge_off_last_y        || 0;
        if (OFF_MOVE_TIMER)  v4ptr.add(OFF_MOVE_TIMER ).writeS32(0);
        if (OFF_SEND_COOL)   v4ptr.add(OFF_SEND_COOL  ).writeS32(0);
        if (OFF_MOVE_ACTIVE) v4ptr.add(OFF_MOVE_ACTIVE).writeU8 (0);
        if (OFF_LAST_X)      v4ptr.add(OFF_LAST_X     ).writeS32(-300);
        if (OFF_LAST_Y)      v4ptr.add(OFF_LAST_Y     ).writeS32(-300);
    } catch (e) {}
}
function distanceToTarget() {
    const dx = state.myPosX - _dodge_moveX;
    const dy = state.myPosY - _dodge_moveY;
    return Math.sqrt(dx * dx + dy * dy);
}
function passedTarget() {
    const ax   = _dodge_moveX - _dodge_startX;
    const ay   = _dodge_moveY - _dodge_startY;
    const len2 = ax * ax + ay * ay;
    if (len2 <= 0) return false;
    const bx = state.myPosX - _dodge_startX;
    const by = state.myPosY - _dodge_startY;
    return (ax * bx + ay * by) >= len2;
}
function logDangerDelay(flags, targetX, targetY, detail) {
    if (!dangerDetectedAt) return;
    if (dangerDelayLogged) return;
    const ms    = Date.now() - dangerDetectedAt;
    const cause =
        '[DangerDelay] ms=' + ms +
        ' target=('  + targetX + ',' + targetY + ')' +
        ' detected=('+ dangerDetectedX + ',' + dangerDetectedY + ')' +
        ' flags='    + flags +
        ' detail='   + detail;
    try { console.log(cause); } catch (_) {}
    dangerDelayLogged = true;
}
function moveTo(targetX, targetY, flags) {
    if (!targetX) return;
    logDangerDelay(flags, targetX, targetY, 32);
    _dodge_moving       = true;
    _dodge_moveX        = targetX | 0;
    _dodge_moveY        = targetY | 0;
    _dodge_startX       = state.myPosX | 0;
    _dodge_startY       = state.myPosY | 0;
    _dodge_releaseUntil = Date.now();
}
function redirectClear() {
    const wasEnabled = Inputs_enabled;
    Inputs_enabled   = false;
    Inputs_pos       = null;
    return wasEnabled;
}
function redirectSetDirection(dx, dy) {
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 0.001) return false;
    const nx = dx / len;
    const ny = dy / len;
    const sameDirection =
        Math.abs(nx - Inputs_x) < 0.0001 &&
        Math.abs(ny - Inputs_y) < 0.0001;
    Inputs_x       = nx;
    Inputs_y       = ny;
    Inputs_enabled = true;
    if (!sameDirection) {
        logDangerDelay(
            4,
            nx,
            ny,
            'direction=(' + nx.toFixed(1) + ',' + ny.toFixed(1) + ')'
        );
    }
    return true;
}
function redirectCharacterPos(character) {
    if (!isValidPtr(character)) return null;
    if (!state.natives.getX || !state.natives.getY) return null;
    try {
        const x = state.natives.getX(character) / 16384;
        const y = state.natives.getY(character) / 16384;
        if (Math.abs(x) >= 20000 || Math.abs(y) >= 20000) return null;
        return { x: x, y: y };
    } catch (e) { return null; }
}
function redirectPack(x, y) {
    const xi = (x | 0) & 0xFFFF;
    const yi = (y | 0) & 0xFFFF;
    return ((yi << 16) | xi) >>> 0;
}
function resetProjectileGIDTracking(highWaterGID) {
    seenGlobalIDs.clear();
    state.activeProjectiles.clear();
    clearSubtilePath();
    lastProjectileGlobalIDSeen = highWaterGID;
    frameProjectileStartMemo = new Map();
}
function installDodge(enabled) {
    dodgeMenuState = !!enabled;
    state.dodge = !!enabled;
    if (DodgeConfig.angleVectors.length === 0) {
        DodgeConfig.numAngles = 24;
        rebuildDodgeAngleCache();
    }
    if (DodgeConfig.safeWalkScans.length === 0) {
        const offsets = [15, 30, 45, 60, 75, 90];
        DodgeConfig.safeWalkScans = offsets.map(function (d) {
            const r = degToRad(d);
            return { offset: d, cos: Math.cos(r), sin: Math.sin(r) };
        });
    }
    if (updateMovementHandlers.indexOf(dodgeMovementTick) === -1) {
        updateMovementHandlers.push(dodgeMovementTick);
    }
}
function dodgeMovementTick(selfPtr) {
    if (!dodgeMenuState) return;
    if (!state.dodge) return;
    const now = Date.now();
    beginFrameMemo(now);
    refreshTileCacheIfNeeded(now);
    refreshFrameCache(now);
    refreshDodgeFrameCache(now);
    if (isPointThreatened(state.myPosX, state.myPosY)) {
        const desiredAngle = joystickAngleWorld(selfPtr);
        const target = findBestDodgeTarget(state.myPosX, state.myPosY, desiredAngle);
        if (target) {
            dodgeMovementBusy = true;
            moveTo(target.x, target.y, 32);
            applyDodgeTarget(target.x, target.y);
            const dx = target.x - state.myPosX;
            const dy = target.y - state.myPosY;
            redirectSetDirection(dx, dy);
            if (!dangerDetectedAt) {
                dangerDetectedAt = now;
                dangerDetectedX  = state.myPosX;
                dangerDetectedY  = state.myPosY;
                dangerDelayLogged = false;
            }
        }
    } else {
        if (_dodge_moving && passedTarget()) {
            _dodge_moving = false;
            redirectClear();
            clearSubtilePath();
            dodgeMovementBusy = false;
            dangerDetectedAt = 0;
            dangerDelayLogged = false;
        }
    }
}
function dodgeStart() { installDodge(true); }
function dodgeStop()  {
    dodgeMenuState = false;
    state.dodge = false;
    redirectClear();
    clearSubtilePath();
    dodgeMovementBusy = false;
}
function installKillAura(natives, libgBaseArg) {
    const base = (natives && natives.base) || libgBaseArg ||
                 Process.getModuleByName('libg.so').base;
    let BattleScreen_getLogicBattleModeClient;
    let LogicBattleModeClient_getOwnCharacterKA;
    let LogicBattleModeClient_isUltiReadyForClientKA;
    let BattleScreen_autoShootKA;
    let BattleScreen_tryToActivateSkillKA;
    let Character_getUltiSkillServerKA;
    let Character_getPrimarySkillServerKA;
    let LogicSkillData_getCastingRangeKA;
    let LogicGameObjectClient_getXKA;
    let LogicGameObjectClient_getYKA;
    let isImmuneAndBulletsGoThroughKA;
    let hasAmmoKA;
    let getSkillRechargeMsKA;
    let BattleMode_getInstanceKA;
    try {
        BattleScreen_getLogicBattleModeClient = new NativeFunction(
            base.add(0x81894C), 'pointer', ['pointer']);
        LogicBattleModeClient_getOwnCharacterKA = new NativeFunction(
            base.add(0xB81A28), 'pointer', ['pointer']);
        LogicBattleModeClient_isUltiReadyForClientKA = new NativeFunction(
            base.add(0xB81C04), 'int', ['pointer', 'pointer']);
        BattleScreen_autoShootKA = new NativeFunction(
            base.add(0x802660), 'int64', ['pointer', 'pointer']);
        BattleScreen_tryToActivateSkillKA = new NativeFunction(
            base.add(0x80D3D8), 'int',
            ['pointer', 'pointer', 'pointer', 'int', 'int', 'int', 'int']);
        Character_getUltiSkillServerKA = new NativeFunction(
            base.add(0xAB6764), 'pointer', ['pointer']);
        Character_getPrimarySkillServerKA = new NativeFunction(
            base.add(0xAB3750), 'pointer', ['pointer', 'int']);
        LogicSkillData_getCastingRangeKA = new NativeFunction(
            base.add(0xA92F94), 'int', ['pointer']);
        LogicGameObjectClient_getXKA = new NativeFunction(
            base.add(0xAE4F9C), 'uint32', ['pointer']);
        LogicGameObjectClient_getYKA = new NativeFunction(
            base.add(0xAE4FA4), 'uint32', ['pointer']);
        isImmuneAndBulletsGoThroughKA = new NativeFunction(
            base.add(0xAB55A0), 'int', ['pointer', 'int']);
        hasAmmoKA = new NativeFunction(
            base.add(0xAB5554), 'int', ['pointer']);
        getSkillRechargeMsKA = new NativeFunction(
            base.add(0xAB5350), 'int64', ['pointer', 'pointer']);
        BattleMode_getInstanceKA = new NativeFunction(
            base.add(0x954760), 'pointer', []);
    } catch (e) {
        try { console.warn('[killAura] native bind failed: ' + e); } catch (_) {}
        return null;
    }
    const BattleScreen_updateMovement_KA              = base.add(0x809348);
    const BattleScreen_getClosestTargetForAutoshoot_KA = base.add(0x814F60);
    const LogicBattleModeClient_update_KA             = base.add(0xBD7068);
    let targetX     = 0;
    let targetY     = 0;
    let targetAlive = false;
    let targetPtr   = NULL;
    let isInMatch     = false;
    let mapPtr        = NULL;
    let cachedMapBase = null;
    let mapCols       = 0;
    let mapRows       = 0;
    let jsMapCache    = null;
    let lastShotTime  = 0;
    let lastUltiTime  = 0;
    let lastFrameShot = false;
    state.killAura = state.killAura || {};
    state.killAura.getTargetPtr   = function () { return targetPtr; };
    state.killAura.getTargetAlive = function () { return targetAlive; };
    state.killAura.getTargetXY    = function () { return { x: targetX, y: targetY }; };
    state.killAura.getInMatch     = function () { return isInMatch; };
    const getHealthPercent       = AIM_PRIMITIVES.getHealthPercent;
    const getRangeFromSkillServer = AIM_PRIMITIVES.makeGetRangeFromSkillServer(
        LogicSkillData_getCastingRangeKA);
    const isWallAt = AIM_PRIMITIVES.makeIsWallAt(
        function () { return jsMapCache; },
        function () { return { cols: mapCols, rows: mapRows }; }
    );
    const hasWallBetween = AIM_PRIMITIVES.makeHasWallBetween(isWallAt);
    roundingMode.killAuraHasWallBetween = hasWallBetween;
    function cleanup() {
        isInMatch   = false;
        targetAlive = false;
        targetPtr   = NULL;
        jsMapCache  = null;
        mapPtr      = NULL;
    }
    function refreshMapCache() {
        if (!isInMatch) return;
        try {
            const battleMode = BattleMode_getInstanceKA();
            if (!isValidPtr(battleMode)) return;
            const logicMap = battleMode.add(0x10784).readPointer();
            if (!isValidPtr(logicMap)) {
                mapPtr = NULL;
                return;
            }
            mapPtr = logicMap;
            const cols = logicMap.add(0xC4).readS32();
            const rows = logicMap.add(0xC8).readS32();
            if (cols <= 0 || rows <= 0 || cols > 64 || rows > 64) return;
            const tilesBase = logicMap.add(0x2A30).readPointer();
            if (!isValidPtr(tilesBase)) return;
            const total = cols * rows;
            if (cachedMapBase === null ||
                !cachedMapBase.equals(tilesBase) ||
                mapCols !== cols ||
                mapRows !== rows ||
                jsMapCache === null ||
                jsMapCache.length !== total) {
                mapCols       = cols;
                mapRows       = rows;
                cachedMapBase = tilesBase;
                jsMapCache    = new Uint8Array(total);
            }
            const raw = tilesBase.readByteArray(total);
            if (raw) jsMapCache.set(new Uint8Array(raw));
        } catch (_) {}
    }
    const refreshHandle = setInterval(refreshMapCache, 1000);
    try {
        Interceptor.attach(BattleScreen_updateMovement_KA, {
            onEnter: function (args) {
                mapPtr    = args[1];
                isInMatch = true;
            },
        });
    } catch (e) {}
    try {
        Interceptor.attach(BattleScreen_getClosestTargetForAutoshoot_KA, {
            onEnter: function (args) {
                if (mapPtr && !mapPtr.isNull()) return;
                args[1]   = NULL;
                mapPtr    = NULL;
                isInMatch = false;
            },
            onLeave: function (retval) {
                if (!killAuraMenuState) return;
                if (!isInMatch) return;
                if (!isValidPtr(retval)) {
                    targetAlive = false;
                    targetPtr   = NULL;
                    rawTarget.valid = false;
                    return;
                }
                const hp = retval.add(0xAC).readS32();
                if (hp <= 0) {
                    targetAlive = false;
                    targetPtr   = NULL;
                    rawTarget.valid = false;
                    return;
                }
                targetAlive = true;
                targetPtr   = retval;
                targetX     = retval.add(0x2A30).readS32();
                targetY     = retval.add(0x2A34).readS32();
                rawTarget.x     = targetX;
                rawTarget.y     = targetY;
                rawTarget.valid = true;
            },
        });
    } catch (e) {}
    try {
        Interceptor.attach(LogicBattleModeClient_update_KA, {
            onEnter: function (args) {
                this.args0 = args[0];
            },
            onLeave: function () {
                if (!killAuraMenuState) return;
                if (!isInMatch) return;
                if (!targetAlive) return;
                const self = this.args0 || (this.context && this.context.x0);
                let logic, own;
                try {
                    logic = BattleScreen_getLogicBattleModeClient(self);
                    if (!isValidPtr(logic)) return;
                    own = LogicBattleModeClient_getOwnCharacterKA(logic);
                    if (!isValidPtr(own)) return;
                } catch (e) { return; }
                if (getHealthPercent(targetPtr) > killAuraMinHealth) return;
                let ownX, ownY;
                try {
                    ownX = LogicGameObjectClient_getXKA(own);
                    ownY = LogicGameObjectClient_getYKA(own);
                } catch (e) { return; }
                try {
                    if (isImmuneAndBulletsGoThroughKA(targetPtr, 0)) return;
                } catch (e) {}
                const dist = getDistance(ownX, ownY, targetX, targetY);
                const coeff = config.timeToHitMultiplyCoeficient || 0.82;
                const projSpeed = Math.max(900, (config.projectileSpeed || 1) * coeff);
                const tHit = dist / projSpeed;
                let aimX = targetX;
                let aimY = targetY;
                if (aimbotMenuState) {
                    try {
                        const pred = predictFuturePosition(tHit);
                        if (pred && typeof pred.x === 'number') {
                            aimX = pred.x;
                            aimY = pred.y;
                            predictedTarget.x     = aimX;
                            predictedTarget.y     = aimY;
                            predictedTarget.valid = true;
                        }
                    } catch (_) {}
                }
                const now = Date.now();
                if (killAuraUseUlti &&
                    LogicBattleModeClient_isUltiReadyForClientKA(logic, own) &&
                    (now - lastUltiTime) > 250) {
                    try {
                        const ultiServer = Character_getUltiSkillServerKA(own);
                        if (isValidPtr(ultiServer)) {
                            const ultiRange = getRangeFromSkillServer(ultiServer);
                            if (dist <= ultiRange + 200) {
                                BattleScreen_tryToActivateSkillKA(
                                    self, own, ultiServer,
                                    aimX, aimY,
                                    0, 7
                                );
                                lastUltiTime  = now;
                                lastFrameShot = true;
                                return;
                            }
                        }
                    } catch (_) {}
                }
                try {
                    if (!hasAmmoKA(own)) return;
                } catch (e) { return; }
                try {
                    const primaryServer = Character_getPrimarySkillServerKA(own, 0);
                    if (!isValidPtr(primaryServer)) return;
                    const primaryRange = getRangeFromSkillServer(primaryServer);
                    if (dist - 145 > primaryRange) return;
                    if (hasWallBetween(ownX, ownY, aimX, aimY)) return;
                    if (aimbotMenuState) {
                        BattleScreen_tryToActivateSkillKA(
                            self, own, primaryServer,
                            aimX, aimY,
                            0, 7
                        );
                    } else {
                        BattleScreen_autoShootKA(self, own);
                    }
                    lastShotTime  = now;
                    lastFrameShot = true;
                } catch (_) {}
            },
        });
    } catch (e) {}
    return {
        cleanup:          cleanup,
        refreshMapCache:  refreshMapCache,
        hasWallBetween:   hasWallBetween,
        isWallAt:         isWallAt,
        getRangeFromSkillServer: getRangeFromSkillServer,
    };
}
function installHoldToShoot(natives, libgBaseArg) {
    const base = (natives && natives.base) || libgBaseArg ||
                 Process.getModuleByName('libg.so').base;
    let BattleScreen_getLogicBattleModeClientHTS;
    let LogicBattleModeClient_getOwnCharacterHTS;
    let LogicBattleModeClient_isUltiReadyForClientHTS;
    let LogicGameObjectClient_getXHTS;
    let LogicGameObjectClient_getYHTS;
    let BattleScreen_autoShootHTS;
    let BattleScreen_tryToActivateSkillHTS;
    let Character_getPrimarySkillServerHTS;
    let Character_getUltiSkillServerHTS;
    let LogicSkillData_getCastingRangeHTS;
    try {
        BattleScreen_getLogicBattleModeClientHTS = new NativeFunction(
            base.add(0x818BCC), 'pointer', ['pointer']);
        LogicBattleModeClient_getOwnCharacterHTS = new NativeFunction(
            base.add(0xB90A28), 'pointer', ['pointer']);
        LogicBattleModeClient_isUltiReadyForClientHTS = new NativeFunction(
            base.add(0xB90C04), 'int', ['pointer', 'pointer']);
        LogicGameObjectClient_getXHTS = new NativeFunction(
            base.add(0xAE4A1C), 'uint32', ['pointer']);
        LogicGameObjectClient_getYHTS = new NativeFunction(
            base.add(0xAE4A24), 'uint32', ['pointer']);
        BattleScreen_autoShootHTS = new NativeFunction(
            base.add(0x802960), 'int64', ['pointer', 'pointer']);
        BattleScreen_tryToActivateSkillHTS = new NativeFunction(
            base.add(0x80D758), 'int',
            ['pointer', 'pointer', 'pointer', 'int', 'int', 'int', 'int']);
        Character_getPrimarySkillServerHTS = new NativeFunction(
            base.add(0xA94114), 'pointer', ['pointer']);
        Character_getUltiSkillServerHTS = new NativeFunction(
            base.add(0x802174), 'pointer', ['pointer']);
        LogicSkillData_getCastingRangeHTS = new NativeFunction(
            base.add(0x809348), 'int', ['pointer']);
    } catch (e) {
        try { console.warn('[holdToShoot] native bind failed: ' + e); } catch (_) {}
        return null;
    }
    const BattleScreen_convertToControlScheme        = base.add(0xAB4390);
    const BattleScreen_updateMovement_HTS            = base.add(0xAB73A4);
    const BattleScreen_getClosestTargetForAutoshoot_HTS = base.add(0x8151E0);
    const AttackHeld = base.add(0xED1);
    const UltiHeld   = base.add(0xED2);
    const aim = {
        valid: false,
        x:     0,
        y:     0,
        time:  0,
    };
    const indexCap = {
        valid: false,
        x:     0,
        y:     0,
    };
    const button = {
        attackHeld:      false,
        ultiHeld:        false,
        attackPressTime: 0,
        ultiPressTime:   0,
        attackFired:     false,
        ultiFired:       false,
    };
    state.holdToShoot = state.holdToShoot || {};
    state.holdToShoot.aim    = aim;
    state.holdToShoot.index  = indexCap;
    state.holdToShoot.button = button;
    const getSkillRange = AIM_PRIMITIVES.makeGetSkillRange(LogicSkillData_getCastingRangeHTS);
    const isInRange = AIM_PRIMITIVES.makeIsInRange(function () { return holdToShootRangeCheck; });
    function hasWallBetweenStub() { return false; }
    const hasWallBetween =
        (roundingMode && typeof roundingMode.killAuraHasWallBetween === 'function')
            ? roundingMode.killAuraHasWallBetween
            : hasWallBetweenStub;
    function onEnter_convertToControlScheme(args) {
        if (!holdToShootMenuState) return;
        try {
            const packed = args[1].toInt32() >>> 0;
            const x =  packed         & 0xFFFF;
            const y = (packed >>> 16) & 0xFFFF;
            aim.x    = x;
            aim.y    = y;
            aim.time = Date.now();
            aim.valid = true;
        } catch (e) {}
    }
    function onLeave_getClosestTargetForAutoshoot() {
        if (!holdToShootMenuState) return;
        try {
            const self = this.context && this.context.x0 ? ptr(this.context.x0) : null;
            if (!isValidPtr(self)) return;
            const idx = self.add(0xAC).readS32();
            indexCap.valid = (idx !== 0);
            indexCap.x = self.add(0x2A30).readS32();
            indexCap.y = self.add(0x2A34).readS32();
        } catch (e) {}
    }
    function onEnter_updateMovement(args) {
        if (!holdToShootMenuState) return;
        if (!isValidPtr(args[0])) return;
        const battleScreen = args[0];
        const now = Date.now();
        let attackHeld, ultiHeld;
        try {
            attackHeld = Memory.readU8(AttackHeld) === 1;
            ultiHeld   = Memory.readU8(UltiHeld)   === 1;
        } catch (e) { return; }
        if (attackHeld && !button.attackHeld) {
            button.attackPressTime = now;
            button.attackFired = false;
        }
        if (!attackHeld) button.attackFired = false;
        if (ultiHeld && !button.ultiHeld) {
            button.ultiPressTime = now;
            button.ultiFired = false;
        }
        if (!ultiHeld) button.ultiFired = false;
        button.attackHeld = attackHeld;
        button.ultiHeld   = ultiHeld;
        if (!attackHeld && !ultiHeld) return;
        let logic, character;
        try {
            logic = BattleScreen_getLogicBattleModeClientHTS(battleScreen);
            if (!isValidPtr(logic)) return;
            character = LogicBattleModeClient_getOwnCharacterHTS(logic);
            if (!isValidPtr(character)) return;
        } catch (e) { return; }
        let ownX, ownY;
        try {
            ownX = LogicGameObjectClient_getXHTS(character);
            ownY = LogicGameObjectClient_getYHTS(character);
        } catch (e) { return; }
        let pred = null;
        if (aimbotMenuState && indexCap.valid) {
            try {
                const distForPrediction = getDistance(ownX, ownY, indexCap.x, indexCap.y);
                const projSpeed = config.projectileSpeed || 1;
                const coef      = config.timeToHitMultiplyCoeficient || 1;
                const tHit = Math.max(1, (distForPrediction * coef) / projSpeed) - 900;
                pred = predictFuturePosition(tHit);
            } catch (_) { pred = null; }
        }
        if (ultiHeld) {
            try {
                const skill = Character_getUltiSkillServerHTS(character);
                const range = getSkillRange(skill);
                if (holdToShootAim && pred &&
                    !hasWallBetween(ownX, ownY, pred.x, pred.y, 200) &&
                    isInRange(ownX, ownY, pred.x, pred.y, range, 200)) {
                    aim.x = pred.x;
                    aim.y = pred.y;
                }
                if (!button.ultiFired &&
                    (now - button.ultiPressTime) >= holdToShootFirstShotDelay) {
                    const ready = LogicBattleModeClient_isUltiReadyForClientHTS(logic, character) !== 0;
                    if (ready) {
                        BattleScreen_tryToActivateSkillHTS(
                            battleScreen, character, skill,
                            aim.x, aim.y, 0, 0);
                        button.ultiFired = true;
                    }
                }
            } catch (_) {}
        }
        if (attackHeld) {
            try {
                const skill = Character_getPrimarySkillServerHTS(character);
                const range = getSkillRange(skill);
                if (holdToShootAim && pred &&
                    !hasWallBetween(ownX, ownY, pred.x, pred.y, 160) &&
                    isInRange(ownX, ownY, pred.x, pred.y, range, 160)) {
                    aim.x = pred.x;
                    aim.y = pred.y;
                }
                if (!button.attackFired &&
                    (now - button.attackPressTime) >= holdToShootFirstShotDelay) {
                    if (aimbotMenuState && pred) {
                        BattleScreen_tryToActivateSkillHTS(
                            battleScreen, character, skill,
                            aim.x, aim.y, 0, 0);
                    } else {
                        BattleScreen_autoShootHTS(battleScreen, character);
                    }
                    button.attackFired = true;
                }
            } catch (_) {}
        }
    }
    try { Interceptor.attach(BattleScreen_convertToControlScheme, { onEnter: onEnter_convertToControlScheme }); } catch (e) {}
    try {
        Interceptor.attach(BattleScreen_getClosestTargetForAutoshoot_HTS, {
            onEnter: function (args) { this.context.x0 = args[0]; },
            onLeave: onLeave_getClosestTargetForAutoshoot,
        });
    } catch (e) {}
    try { Interceptor.attach(BattleScreen_updateMovement_HTS, { onEnter: onEnter_updateMovement }); } catch (e) {}
    return {
        aim:    aim,
        index:  indexCap,
        button: button,
    };
}
function predictFuturePosition(timeToPredictSeconds) {
    if (typeof timeToPredictSeconds === 'number'
        && Array.isArray(latestX) && latestX.length > 1) {
        const n = latestX.length;
        let totalVx = 0, totalVy = 0, weightSum = 0;
        for (let i = 1; i < n; i++) {
            const dx = latestX[i] - latestX[i - 1];
            const dy = latestY[i] - latestY[i - 1];
            const dt = timeDiffs[i] || 16;
            if (dt <= 0) continue;
            const weight = i;
            totalVx   += (dx / dt) * 1000 * weight;
            totalVy   += (dy / dt) * 1000 * weight;
            weightSum += weight;
        }
        if (weightSum <= 0) return { x: latestX[n - 1], y: latestY[n - 1] };
        const avgVx = totalVx / weightSum;
        const avgVy = totalVy / weightSum;
        const currentX = latestX[n - 1];
        const currentY = latestY[n - 1];
        return {
            x: currentX + avgVx * timeToPredictSeconds,
            y: currentY + avgVy * timeToPredictSeconds,
        };
    }
    return { x: Number(latestX) || 0, y: Number(latestY) || 0 };
}
function calculateDistance(x1, y1, x2, y2) {
    return getDistance(x1, y1, x2, y2);
}
function createRecentArray(maxLen) {
    const n = Math.max(1, Number(maxLen) || 68);
    const buf = new Array(n);
    for (let i = 0; i < n; i++) buf[i] = { x: 0, y: 0, t: 0 };
    buf.head  = 0;
    buf.count = 0;
    buf.max   = n;
    return buf;
}
function aimbotHookGate(args) {
    if (!aimbotMenuState) return;
    if (!args) return;
    battleMode = args;
}
function installAutoSpin(libgBaseArg) {
    const base = libgBaseArg || libgBase || Process.getModuleByName('libg.so').base;
    const RVA_GET_X                       = 0xAE5F5C;
    const RVA_GET_Y                       = 0xAE5F64;
    const RVA_BATTLEMODE_GET              = 0x954EE0;
    const RVA_CLIENTINPUT_CTOR            = 0xB55168;
    const RVA_CLIENTINPUT_MANAGER_ADD     = 0x818F4C;
    const RVA_GAMESCREEN_GET_BATTLECLIENT = 0xB9098C;
    const RVA_SET_CLIENT_PREDICTION       = 0x80978C;
    const SPIN_RADIUS             = 203;
    const CLIENT_INPUT_ALLOC_SIZE = 0xDB40;
    const OFF_TARGET_X            = 0x2A0C;
    const OFF_TARGET_Y            = 0x2A10;
    const OFF_BATTLECLIENT_BACK   = 0x2A58;
    const SET_PRED_FLAG           = 40;
    const OFF_JOYSTICK_BITFIELD   = 0xED7;
    const JOYSTICK_MASK           = 0x3F;
    let _malloc, getX, getY, bmGet, ciCtor, addInput, gsGetB, setPred;
    try {
        const libc = Process.getModuleByName('libc.so');
        _malloc = new NativeFunction(libc.getExportByName('malloc'), 'pointer', ['uint']);
        getX     = new NativeFunction(base.add(RVA_GET_X), 'uint32', ['pointer']);
        getY     = new NativeFunction(base.add(RVA_GET_Y), 'uint32', ['pointer']);
        bmGet    = new NativeFunction(base.add(RVA_BATTLEMODE_GET), 'pointer', ['pointer']);
        ciCtor   = new NativeFunction(base.add(RVA_CLIENTINPUT_CTOR), 'pointer', ['pointer']);
        addInput = new NativeFunction(base.add(RVA_CLIENTINPUT_MANAGER_ADD), 'void', ['pointer', 'pointer']);
        gsGetB   = new NativeFunction(base.add(RVA_GAMESCREEN_GET_BATTLECLIENT), 'pointer', ['pointer']);
        setPred  = new NativeFunction(base.add(RVA_SET_CLIENT_PREDICTION), 'void',
                                       ['pointer', 'int', 'int', 'int']);
    } catch (e) {
        try { console.warn('[autoSpin] native bind failed: ' + e); } catch (_) {}
        return;
    }
    const currentAngle = { value: 0.0 };
    function spinMovementHandler(selfPtr) {
        if (!spinMenuState)     return;
        if (!autoFarmMenuState) return;
        if (dodgeMovementBusy)  return;
        let joyState = 0;
        if (isValidPtr(selfPtr)) {
            try {
                joyState = selfPtr.add(OFF_JOYSTICK_BITFIELD).readU16() & JOYSTICK_MASK;
            } catch (e) { joyState = 0; }
        }
        if (!autoSpinAllowMoving && joyState !== 0) return;
        if (!isValidPtr(selfPtr)) return;
        const charPtr = selfPtr;
        let logic = null;
        try { logic = bmGet(charPtr); } catch (e) { return; }
        if (!isValidPtr(logic)) return;
        let currentX, currentY;
        try {
            currentX = getX(charPtr) | 0;
            currentY = getY(charPtr) | 0;
        } catch (e) { return; }
        const rad   = currentAngle.value * (Math.PI / 180.0);
        const nextX = currentX + Math.round(SPIN_RADIUS * Math.cos(rad));
        const nextY = currentY + Math.round(SPIN_RADIUS * Math.sin(rad));
        currentAngle.value = (currentAngle.value + spinSpeed) % 360;
        let inputBuf, input;
        try {
            inputBuf = _malloc(CLIENT_INPUT_ALLOC_SIZE);
            if (!isValidPtr(inputBuf)) return;
            input = ciCtor(inputBuf);
            if (!isValidPtr(input)) return;
        } catch (e) { return; }
        try {
            input.add(OFF_TARGET_X).writeS32(nextX);
            input.add(OFF_TARGET_Y).writeS32(nextY);
        } catch (e) { return; }
        let battleClient = null;
        try {
            battleClient = input.add(OFF_BATTLECLIENT_BACK).readPointer();
            if (!isValidPtr(battleClient)) battleClient = gsGetB(charPtr);
        } catch (e) {
            try { battleClient = gsGetB(charPtr); } catch (_) { battleClient = null; }
        }
        if (!isValidPtr(battleClient)) return;
        try { setPred(battleClient, nextX, nextY, SET_PRED_FLAG); } catch (e) {}
        try { addInput(battleClient, input); } catch (e) {}
    }
    if (updateMovementHandlers.indexOf(spinMovementHandler) === -1) {
        updateMovementHandlers.push(spinMovementHandler);
    }
    setTimeout(function () {
        if (updateMovementHandlers.indexOf(spinMovementHandler) === -1) {
            updateMovementHandlers.push(spinMovementHandler);
        }
    }, 100);
}
function installDynajump(libgBaseArg) {
    const base = libgBaseArg || libgBase || Process.getModuleByName('libg.so').base;
    let BattleScreen_getLogicBattleModeClient;
    let LogicBattleModeClient_getOwnCharacter;
    let BattleScreen_tryToActivateSkill;
    let Character_getPrimarySkillServer;
    let LogicGameObjectClient_getX;
    let LogicGameObjectClient_getY;
    let hasAmmo;
    let getSkillRechargeMs;
    let ADR_BattleMode_update;
    try {
        BattleScreen_getLogicBattleModeClient = new NativeFunction(
            base.add(0x818F4C), 'pointer', ['pointer']);
        LogicBattleModeClient_getOwnCharacter = new NativeFunction(
            base.add(0xB908A8), 'pointer', ['pointer']);
        BattleScreen_tryToActivateSkill = new NativeFunction(
            base.add(0x80DA18), 'int',
            ['pointer', 'pointer', 'pointer', 'pointer',
             'int', 'int', 'int', 'int']);
        Character_getPrimarySkillServer = new NativeFunction(
            base.add(0xAB36D0), 'pointer', ['pointer', 'int', 'int']);
        LogicGameObjectClient_getX = new NativeFunction(
            base.add(0xAE5F5C), 'uint32', ['pointer']);
        LogicGameObjectClient_getY = new NativeFunction(
            base.add(0xAE5F64), 'uint32', ['pointer']);
        hasAmmo = new NativeFunction(
            base.add(0xAB4094), 'int', ['pointer']);
        getSkillRechargeMs = new NativeFunction(
            base.add(0xAB3E90), 'int64', ['pointer', 'int']);
        ADR_BattleMode_update = base.add(0x39FE9000 & 0xFFFFFFF);
    } catch (e) {
        try { console.warn('[dynajump] native bind failed: ' + e); } catch (_) {}
        return null;
    }
    const OFF_BATTLE_MODE_CLIENT_MIRROR = 10;
    const dx                      = 219;
    const dyA                     = 950;
    const dyB                     = 700;
    const AB_DELAY_MS             = 200;
    const GAP_MS                  = 200;
    const POST_SPAM_SHOT_DELAY_MS = 200;
    const SPAM_INTERVAL_MS        = -400;
    const JUMP_KIND_TAG           = ptr(0xD700095E);
    const PRIMARY_SKILL_SLOT_ARG  = 0x85ED3;
    const MIN_SHOT_INTERVAL_MS    = 145;
    let cachedBm = null;
    const jump = {
        active:        false,
        stage:         0,
        nextAt:        0,
        spamUntil:     0,
        lastShotTime:  0,
    };
    function isPlayfieldMirrored() {
        if (!isValidPtr(cachedBm)) return false;
        try {
            return cachedBm.add(OFF_BATTLE_MODE_CLIENT_MIRROR).readU8() !== 0;
        } catch (e) { return false; }
    }
    function startJump() {
        jump.active    = true;
        jump.stage     = 0;
        jump.nextAt    = 0;
        jump.spamUntil = 0;
    }
    function resetJump() {
        jump.active    = false;
        jump.stage     = 0;
        jump.nextAt    = 0;
        jump.spamUntil = 0;
    }
    function fire(battleScreen, logic, own, offsetX, offsetY) {
        if (!isValidPtr(battleScreen)) return;
        if (!isValidPtr(logic)) return;
        if (!isValidPtr(own)) return;
        const now = Date.now();
        try { getSkillRechargeMs(own, 0); } catch (e) { return; }
        if ((now - jump.lastShotTime) < MIN_SHOT_INTERVAL_MS) return;
        let ownX, ownY;
        try {
            ownX = LogicGameObjectClient_getX(own);
            ownY = LogicGameObjectClient_getY(own);
        } catch (e) { return; }
        let effDx, effDy;
        if (isPlayfieldMirrored()) {
            effDx = -offsetX;
            effDy = -offsetY;
        } else {
            effDx = offsetX;
            effDy = offsetY;
        }
        const aimX = (ownX | 0) + effDx;
        const aimY = (ownY | 0) + effDy;
        let primaryServer;
        try {
            primaryServer = Character_getPrimarySkillServer(own, 0, PRIMARY_SKILL_SLOT_ARG);
        } catch (e) { return; }
        if (!isValidPtr(primaryServer)) return;
        let result;
        try {
            result = BattleScreen_tryToActivateSkill(
                battleScreen, own, primaryServer,
                JUMP_KIND_TAG,
                aimX, aimY,
                effDx, effDy);
        } catch (e) { return; }
        jump.lastShotTime = now;
        return result;
    }
    function onLeave_BattleMode_update() {
        try {
            const arg0 = this.context && this.context.x0 ? ptr(this.context.x0) : null;
            if (isValidPtr(arg0)) cachedBm = arg0;
        } catch (e) {}
    }
    function stateMachine(selfPtr) {
        if (!jump.active) return;
        if (!isValidPtr(selfPtr)) return;
        const battleScreen = selfPtr;
        let logic;
        try { logic = BattleScreen_getLogicBattleModeClient(battleScreen); }
        catch (e) { return; }
        if (!isValidPtr(logic)) return;
        let own;
        try { own = LogicBattleModeClient_getOwnCharacter(logic); }
        catch (e) { return; }
        if (!isValidPtr(own)) return;
        const now = Date.now();
        switch (jump.stage) {
        case 0:
            if (jump.nextAt === 0 || now >= jump.nextAt) {
                fire(battleScreen, logic, own, dx, dyA);
                jump.stage  = 1;
                jump.nextAt = now + AB_DELAY_MS;
            }
            break;
        case 1:
            if (now >= jump.nextAt) {
                fire(battleScreen, logic, own, dx, dyB);
                jump.stage     = 2;
                jump.spamUntil = now + SPAM_WINDOW_MS;
                jump.nextAt    = now + GAP_MS;
            }
            break;
        case 2:
            if (now < jump.spamUntil) {
                if (now >= jump.nextAt) {
                    fire(battleScreen, logic, own, dx, dyB);
                    jump.nextAt = now + SPAM_INTERVAL_MS;
                }
            } else if (now >= jump.nextAt) {
                jump.stage  = 3;
                jump.nextAt = now + POST_SPAM_SHOT_DELAY_MS;
            }
            break;
        case 3:
            if (now >= jump.nextAt) {
                fire(battleScreen, logic, own, dx, dyB);
                jump.stage     = 4;
                jump.spamUntil = now + SPAM_WINDOW_MS;
                jump.nextAt    = now + GAP_MS;
            }
            break;
        case 4:
            if (now < jump.spamUntil) {
                if (now >= jump.nextAt) {
                    fire(battleScreen, logic, own, dx, dyB);
                    jump.nextAt = now + SPAM_INTERVAL_MS;
                }
            } else {
                resetJump();
            }
            break;
        default:
            resetJump();
            break;
        }
    }
    try {
        Interceptor.attach(ADR_BattleMode_update, {
            onEnter: function (args) { this.context.x0 = args[0]; },
            onLeave: onLeave_BattleMode_update,
        });
    } catch (e) {}
    updateMovementHandlers.unshift(stateMachine);
    return {
        start: startJump,
        stop:  resetJump,
        state: jump,
    };
}
function installFps(libgBaseArg) {
    if (!fpsMenuState) return;
    const base = libgBaseArg || libgBase || Process.getModuleByName('libg.so').base;
    let _malloc, _DOSetXY, _STGetClip, _MCGetTF, _MCH_setText, _Stage_addChild, _gotoAndStop, _stringCtor;
    try {
        const libc = Process.getModuleByName('libc.so');
        _malloc = new NativeFunction(libc.getExportByName('malloc'), 'pointer', ['uint']);
        _DOSetXY = new NativeFunction(base.add(0xAC9F40), 'void', ['pointer', 'float', 'float']);
        _STGetClip = new NativeFunction(base.add(0xBECC4E), 'pointer', ['pointer', 'pointer']);
        _MCGetTF = new NativeFunction(base.add(0xBED1A0), 'pointer', ['pointer', 'pointer']);
        _MCH_setText = new NativeFunction(base.add(0xBED6F0), 'void', ['pointer', 'pointer', 'int', 'int']);
        _Stage_addChild = new NativeFunction(base.add(0xACA180), 'void', ['pointer', 'pointer']);
        _gotoAndStop = new NativeFunction(base.add(0xBED8A0), 'void', ['pointer', 'int']);
        _stringCtor = new NativeFunction(base.add(0xBEB210), 'pointer', ['pointer', 'pointer']);
    } catch (e) {
        try { console.warn('[fps] native bind failed: ' + e); } catch (_) {}
        return;
    }
    let lastFps      = -1;
    let lastFpsState = !fpsMenuState;
    let clip         = null;
    let tf           = null;
    function _scPtrFps(s) {
        const buf = _malloc(0xDB40);
        if (!isValidPtr(buf)) return ptr(0);
        try { _stringCtor(buf, strPtr(s)); } catch (e) {}
        return buf;
    }
    if (isValidPtr(STAGE_PTR)) {
        try {
            const clipNameSc = _scPtrFps('textbox_1');
            clip = _STGetClip(STAGE_PTR, clipNameSc);
        } catch (e) { clip = null; }
    }
    if (isValidPtr(clip)) {
        try { tf = _MCGetTF(clip, _scPtrFps('txt')); } catch (e) { tf = null; }
    }
    function fpsListener(fps) {
        if (!isValidPtr(tf)) return;
        if (fps === lastFps)  return;
        lastFps = fps;
        try { _MCH_setText(tf, _scPtrFps('FPS: ' + fps), 4, 0); } catch (e) {}
    }
    if (FPS_FRAME_STATE) {
        FPS_FRAME_STATE.listener = fpsListener;
    } else {
        const rearm = function () {
            if (FPS_FRAME_STATE) FPS_FRAME_STATE.listener = fpsListener;
            else setTimeout(rearm, 100);
        };
        setTimeout(rearm, 100);
    }
    function fpsTicker() {
        if (!isValidPtr(clip)) return;
        if (fpsMenuState === lastFpsState) return;
        lastFpsState = fpsMenuState;
        try { _gotoAndStop(clip, fpsMenuState ? 1 : 0); } catch (e) {}
        if (fpsMenuState) {
            if (isValidPtr(STAGE_PTR)) {
                try { _Stage_addChild(STAGE_PTR, clip); } catch (e) {}
            }
            try {
                clip.add(OFF_DO_SCALE_X).writeFloat(FPS_SCALE);
                clip.add(OFF_DO_SCALE_Y).writeFloat(FPS_SCALE);
            } catch (e) {}
            try { _DOSetXY(clip, 60536, 60536); } catch (e) {}
        }
    }
    setInterval(fpsTicker, 16);
}
function installAutoFarmBridge() {
    if (typeof roundingMode.setAutofarmEnabled === 'function') {
        roundingMode.setAutofarmEnabled(autoFarmMenuState);
    }
    return {
        start: function () {
            autoFarmMenuState = true;
            if (typeof roundingMode.setAutofarmEnabled === 'function')
                roundingMode.setAutofarmEnabled(true);
            if (typeof roundingMode.startFullFlow === 'function')
                roundingMode.startFullFlow();
        },
        stop: function () {
            autoFarmMenuState = false;
            if (typeof roundingMode.setAutofarmEnabled === 'function')
                roundingMode.setAutofarmEnabled(false);
        },
    };
}
function installCamera(libgBaseArg) {
    const base = libgBaseArg || libgBase || Process.getModuleByName('libg.so').base;
    let cam0 = null, cam1 = null, cam2 = null, cam3 = null;
    const camModes = [cam0, cam1, cam2, cam3];
    let lastCam = 0;
    let hPress = null;
    let hCam   = null;
    let hUpd   = null;
    let ourButton = null;
    function getStage() { return STAGE_PTR; }
    function createButton(label) {
        if (isValidPtr(ourButton)) return ourButton;
        const stage = getStage();
        if (!isValidPtr(stage)) return null;
        const clip = safeCall(StringTable_getMovieClip,
                              scPtr('sc/ui.sc'), strPtr('popup_button_blue'));
        if (!isValidPtr(clip)) return null;
        const btn = safeCall(newGameButtonFromClip, clip);
        if (!isValidPtr(btn)) return null;
        safeCall(GameButton_setText, btn, scPtr(label));
        setXYSafe(clip, 800, -540);
        bringToFront(clip);
        ourButton = btn;
        return btn;
    }
    function applyCameraState(camPtr) {
        if (!isValidPtr(camPtr)) return;
        const preset = camModes[lastCam];
        if (!isValidPtr(preset)) return;
        try { Memory.copy(camPtr, preset, 0x40); } catch (e) {}
    }
    function attach() {
        if (!cameraMenuState) return;
        if (typeof Interceptor === 'undefined') return;
        if (hCam || hUpd || hPress) return;
        const BattleScreen_updateCameraParameters = base.add(0x809900);
        const BattleScreen_update                 = base.add(0x80987C);
        try {
            hCam = Interceptor.attach(BattleScreen_updateCameraParameters, {
                onLeave: function () {
                    if (!cameraMenuState) return;
                    try {
                        const x0 = this.context && this.context.x0 ? ptr(this.context.x0) : null;
                        if (isValidPtr(x0)) applyCameraState(x0);
                    } catch (e) {}
                },
            });
        } catch (e) {}
        try {
            hUpd = Interceptor.attach(BattleScreen_update, {
                onEnter: function () {
                    if (!cameraMenuState) return;
                    createButton('Next Cam Mode');
                },
            });
        } catch (e) {}
        if (isValidPtr(CustomButton_buttonPressed)) {
            try {
                hPress = Interceptor.attach(CustomButton_buttonPressed, {
                    onEnter: function (args) {
                        if (!cameraMenuState) return;
                        if (args[0].equals && args[0].equals(ourButton)) {
                            lastCam = (lastCam + 1) & 3;
                        }
                    },
                });
            } catch (e) {}
        }
    }
    function detach() {
        if (hPress) { try { hPress.detach(); } catch (e) {} hPress = null; }
        if (hCam)   { try { hCam.detach();   } catch (e) {} hCam   = null; }
        if (hUpd)   { try { hUpd.detach();   } catch (e) {} hUpd   = null; }
    }
    return { attach: attach, detach: detach };
}
function installPinSpam(libgBaseArg) {
    let intervalId = null;
    let inputMgr   = null;
    const OFF_EMOTE_ID = 0x24;
    function sendEmptyEmote() {
        if (!isValidPtr(inputMgr)) return;
        try {
            const ci = Memory.alloc(0x30);
            if (typeof Cheats.ClientInput_ctor === 'function') {
                Cheats.ClientInput_ctor(ci);
            }
            ci.add(OFF_EMOTE_ID).writeU32(0);
            if (typeof Cheats.ClientInputManager_add === 'function') {
                Cheats.ClientInputManager_add(inputMgr, ci);
            }
        } catch (e) {}
    }
    function setPinMenuState(on) {
        _pinMenuState = on;
        pinMenuState  = on;
        if (on) {
            if (intervalId !== null) {
                try { clearInterval(intervalId); } catch (e) {}
            }
            intervalId = setInterval(sendEmptyEmote, SPAM_WINDOW_MS);
        } else if (intervalId !== null) {
            try { clearInterval(intervalId); } catch (e) {}
            intervalId = null;
        }
    }
    return {
        setPinMenuState:   setPinMenuState,
        sendEmptyEmote:    sendEmptyEmote,
        setInputManager:   function (mgr) { inputMgr = mgr; },
    };
}
function spectateByTag() {
    try {
        const tab = tabMenuObjects.Misc;
        const grp = tab && tab.groups && tab.groups.spectateByTagGroup;
        if (!grp) return null;
        const inputWidget = grp.find && grp.find('spectateTagInput');
        if (!inputWidget || typeof inputWidget.getText !== 'function') return null;
        const tag = inputWidget.getText();
        if (!tag) return null;
        const toggle = grp.find && grp.find('spectateBrawlTv');
        const useBrawlTV = toggle && typeof toggle.getState === 'function'
                         ? toggle.getState() : !!spectateByTagUseBrawlTV;
        sendSpectateByTag(tag, useBrawlTV);
    } catch (e) {
        try { console.warn('[Spectate] dispatch failed: ' + e); } catch (_) {}
    }
    return null;
}
function installSpectate() {
    return {
        spectateByTag:     spectateByTag,
        sendSpectateByTag: sendSpectateByTag,
        sendPacket:        sendPacket,
        hashTagToId:       hashTagToId,
    };
}
function _quickAccessIsActive(indexOrTarget) {
    if (typeof indexOrTarget === 'number') {
        const idx = indexOrTarget;
        const slot = quickAccessSlots.slotData[idx];
        if (!slot || !slot.targetId) return false;
        const target = _quickAccessResolveTarget(slot.targetId);
        if (!target) return false;
        if (target.widget && typeof target.widget.getState === 'function') {
            try { return !!target.widget.getState(); } catch (_) {}
        }
        return false;
    }
    const id = (indexOrTarget && indexOrTarget.spec)
             ? indexOrTarget.spec.quickAccessId : indexOrTarget;
    for (let i = 0; i < quickAccessSlots.slotData.length; i++) {
        const slot = quickAccessSlots.slotData[i];
        if (!slot || slot.targetId !== id) continue;
        const target = _quickAccessResolveTarget(slot.targetId);
        if (target && target.widget && typeof target.widget.getState === 'function') {
            try { if (target.widget.getState()) return true; } catch (_) {}
        }
    }
    return false;
}
quickAccessIsActive = _quickAccessIsActive;
function _quickAccessResolveTarget(id) {
    return quickAccessTargets.get(id) || null;
}
quickAccessResolveTarget = _quickAccessResolveTarget;
function _quickAccessColorize(arg0, arg1, arg2, arg3) {
    if (typeof arg0 === 'string') {
        const text = arg0;
        const active = arg1, pending = arg2;
        if (pending) return '<c#B0B0B0>' + text + '</c>';
        if (active)  return '<c#40FF40>' + text + '</c>';
        return '<c#FFD84A>' + text + '</c>';
    }
    const target = arg0;
    if (!isValidPtr(target)) return;
    let r, g, b;
    if (arg3) { r = 0xFF; g = 0x88; b = 0x00; }
    else if (arg2) { r = 0x33; g = 0xCC; b = 0x33; }
    else { r = 0xAA; g = 0xAA; b = 0xAA; }
    try {
        target.add(0xB0).writeU8(r);
        target.add(0xB1).writeU8(g);
        target.add(0xB2).writeU8(b);
    } catch (e) {}
}
quickAccessColorize = _quickAccessColorize;
function _quickAccessGradientLabel(arg0, arg1) {
    if (typeof arg0 === 'string') {
        const label = arg0;
        const colors = ['#2a2a2a', '#4A4A4A', '#646464', '#989898', '#CCCCCC', '#E6E6E6'];
        const text = String(label);
        const N = text.length;
        if (!N) return '';
        let out = '';
        for (let i = 0; i < N; i++) {
            const ch = text.charAt(i);
            const idx = Math.min(
                colors.length - 1,
                Math.floor((i / N) * colors.length));
            out += '<c' + colors[idx] + '>' + ch + '</c>';
        }
        return out;
    }
    const textField = arg0;
    const label = arg1;
    if (!isValidPtr(textField)) return;
    const colors = QUICK_ACCESS_PENDING_COLORS;
    const text = String(label != null ? label : '');
    let out = '';
    for (let idx = 0; idx < text.length; idx++) {
        const ch = text.charAt(idx);
        const band = colors[Math.min(colors.length - 1,
            (idx * colors.length / Math.max(1, text.length)) | 0)];
        const hex = ('000000' + band.toString(16)).slice(-6).toUpperCase();
        out += '<c=#' + hex + '>' + ch + '</c>';
    }
    try {
        if (MovieClipHelper_setTextAndScaleIfNecessary)
            MovieClipHelper_setTextAndScaleIfNecessary(textField, scPtr(out), 1, 1);
    } catch (e) {}
}
quickAccessGradientLabel = _quickAccessGradientLabel;
function quickAccessSetButtonLabel(btn, label, active, pending) {
    if (!btn) return;
    if (typeof btn.setLabel === 'function') {
        try { btn.setLabel(label, !!active, !!pending); } catch (e) {}
        return;
    }
    const target = btn.ptr || btn;
    if (!isValidPtr(target)) return;
    const decorated = pending
        ? _quickAccessGradientLabel(label)
        : _quickAccessColorize(label, !!active, false);
    if (GameButton_setText)
        safeCall(GameButton_setText, target, scPtr(decorated));
}
function _quickAccessRefresh() {
    if (!quickAccessUi) return;
    for (let i = 0; i < quickAccessSlots.slotData.length; i++) {
        const slot = quickAccessSlots.slotData[i];
        if (!slot) continue;
        const btn = slot.button || (quickAccessUi.slotBtns && quickAccessUi.slotBtns[i]);
        if (!btn) continue;
        if (slot.targetId == null) {
            quickAccessSetButtonLabel(btn, 'Quick Access', false, false);
            continue;
        }
        const target = _quickAccessResolveTarget(slot.targetId);
        if (!target) {
            quickAccessSetButtonLabel(btn, '(missing)', false, false);
            continue;
        }
        if (quickAccessUi.pendingTargetId === slot.targetId) {
            const lbl = (target.spec && (target.spec.quickAccessLabel || target.spec.key)) || slot.targetId;
            quickAccessSetButtonLabel(btn, lbl, false, true);
            continue;
        }
        const active = _quickAccessIsActive(i);
        let label;
        if (target.spec && target.spec.quickAccessText) {
            label = target.spec.quickAccessText;
        } else if (target.spec && target.spec.quickAccessLabel) {
            label = target.spec.quickAccessLabel;
        } else if (target.widget && typeof target.widget.getState === 'function') {
            label = ((target.spec && target.spec.key) || '')
                  + ': ' + (target.widget.getState() ? 'ON' : 'OFF');
        } else {
            label = (target.spec && target.spec.key) || slot.targetId;
        }
        quickAccessSetButtonLabel(btn, label, active, false);
    }
}
quickAccessRefresh = _quickAccessRefresh;
function _quickAccessSetSlot(slotIndex, targetId) {
    slotIndex = slotIndex | 0;
    if (slotIndex < 0 || slotIndex >= quickAccessSlots.slotData.length) return;
    const slot = quickAccessSlots.slotData[slotIndex];
    if (!slot) return;
    if (targetId == null) {
        slot.targetId = null;
        slot.label    = 'Add';
        _quickAccessRefresh();
        return;
    }
    const target = _quickAccessResolveTarget(targetId);
    if (!target) {
        try { console.warn('[QA] setSlot: unknown targetId: ' + targetId); } catch (_) {}
        return;
    }
    slot.targetId = targetId;
    slot.label = (target.spec && (target.spec.quickAccessLabel || target.spec.key)) || targetId;
    if (quickAccessUi.pendingTargetId === targetId) {
        quickAccessUi.pendingTargetId = null;
    }
    _quickAccessRefresh();
    if (quickAccessUi.slotsVisible) _quickAccessShowHide(false);
}
quickAccessSetSlot = _quickAccessSetSlot;
function _quickAccessOpen(targetId) {
    quickAccessUi.pendingTargetId = targetId;
    quickAccessUi.slotsVisible    = true;
    _quickAccessShowHide(true);
    _quickAccessRefresh();
}
quickAccessOpen = _quickAccessOpen;
function _quickAccessToggle() {
    const next = !quickAccessUi.slotsVisible;
    quickAccessUi.slotsVisible    = next;
    quickAccessUi.pendingTargetId = null;
    _quickAccessShowHide(next);
    _quickAccessRefresh();
    return next;
}
quickAccessToggle = _quickAccessToggle;
function _quickAccessShowHide(show) {
    const tBtn = quickAccessUi.toggleBtnWidget;
    if (tBtn && isValidPtr(tBtn.ptr)) {
        const toggleY = QUICK_ACCESS_TOP_Y;
        setVisible(tBtn.ptr, !!show);
        if (typeof tBtn.x === 'number') setXYSafe(tBtn.ptr, tBtn.x, toggleY);
        if (show) bringToFront(tBtn.ptr);
    }
    const btns = quickAccessUi.slotBtns || quickAccessSlots.slotBtns;
    if (!btns || btns.length === 0) return;
    if (!quickAccessUi.enabled) {
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            if (btn && isValidPtr(btn.ptr || btn)) setVisible(btn.ptr || btn, false);
        }
        return;
    }
    if (!show) {
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            if (btn && isValidPtr(btn.ptr || btn)) setVisible(btn.ptr || btn, false);
        }
        return;
    }
    const pending = !!quickAccessUi.pendingTargetId;
    const popupX = quickAccessUi.popupX || 0;
    for (let i = 0; i < btns.length; i++) {
        const btn = btns[i];
        if (!btn || !isValidPtr(btn.ptr || btn)) continue;
        const slot = quickAccessSlots.slotData[i];
        const slotX = (btn.x !== undefined) ? btn.x : popupX;
        const slotY = QUICK_ACCESS_TOP_Y + QUICK_ACCESS_SLOT_STEP * (i + 1);
        const shouldShow = pending || (slot && slot.targetId != null);
        setVisible(btn.ptr || btn, !!shouldShow);
        if (shouldShow) {
            setXYSafe(btn.ptr || btn, slotX, slotY);
            bringToFront(btn.ptr || btn);
        }
    }
}
quickAccessShowHide = _quickAccessShowHide;
function _quickAccessRegisterTarget(specOrId, widget) {
    let id, descriptor;
    if (typeof specOrId === 'string') {
        id = specOrId;
        descriptor = widget;
    } else {
        id = specOrId && specOrId.quickAccessId;
        descriptor = { spec: specOrId, widget: widget };
    }
    if (!id) return;
    quickAccessTargets.set(id, descriptor);
    _quickAccessRefresh();
}
quickAccessRegisterTarget = _quickAccessRegisterTarget;
function installQuickAccess() {
    quickAccessUi.slotsVisible    = false;
    quickAccessUi.pendingTargetId = null;
    _quickAccessRefresh();
    return {
        isActive:        _quickAccessIsActive,
        colorize:        _quickAccessColorize,
        gradientLabel:   _quickAccessGradientLabel,
        setButtonLabel:  quickAccessSetButtonLabel,
        refresh:         _quickAccessRefresh,
        resolveTarget:   _quickAccessResolveTarget,
        setSlot:         _quickAccessSetSlot,
        open:            _quickAccessOpen,
        toggle:          _quickAccessToggle,
        showHide:        _quickAccessShowHide,
        registerTarget:  _quickAccessRegisterTarget,
    };
}
function FN_30_dodge_onToggle(on) {
    dodgeMenuState = on;
    state.dodge = on;
    installDodge(on);
}
function FN_31_dodge_openMenu_onPress() {
    if (typeof roundingMode.autododgeMenu === 'function') {
        return roundingMode.autododgeMenu();
    }
    if (UIPopup && typeof UIPopup.show === 'function') {
        UIPopup.show('AutoDodge');
    }
}
function FN_32_dodge_quickAccess_onPress() { return _quickAccessOpen('dodge'); }
function FN_33_aimbot_onToggle(on) {
    aimbotMenuState = on;
    state.aimbot = on;
}
function FN_36_aimbot_quickAccess_onPress() { return _quickAccessOpen('aimbot'); }
function FN_37_killAura_onToggle(on) {
    killAuraMenuState = on;
    state.killAura = on;
}
function FN_40_killAuraUseUlti_onChange(s) {
    killAuraUseUlti = !killAuraUseUlti;
}
function FN_41_killAura_quickAccess_onPress() { return _quickAccessOpen('killAura'); }
function FN_42_holdToShoot_onToggle(on) {
    holdToShootMenuState = on;
    state.holdToShoot = on;
}
function FN_45_holdToShootAim_onChange(s) {
    holdToShootAim = !holdToShootAim;
}
function FN_46_holdToShootRangeCheck_onChange(s) {
    holdToShootRangeCheck = !holdToShootRangeCheck;
}
function FN_47_holdToShoot_quickAccess_onPress() { return _quickAccessOpen('holdToShoot'); }
function FN_48_autoFarm_onToggle(on) {
    autoFarmMenuState = on;
    state.autoFarm = on;
    if (typeof roundingMode.setAutofarmEnabled === 'function') {
        roundingMode.setAutofarmEnabled(on);
    }
    if (on && typeof roundingMode.startFullFlow === 'function') {
        roundingMode.startFullFlow();
    }
}
function FN_49_autoFarm_quickAccess_onPress() { return _quickAccessOpen('autoFarm'); }
function FN_50_dynajump_do4Jumps_onPress() {
    if (typeof roundingMode.dynajumpDo4Jumps === 'function') {
        return roundingMode.dynajumpDo4Jumps();
    }
    if (typeof Cheats.dynajumpStart === 'function') return Cheats.dynajumpStart();
}
function FN_53_dynajump_quickAccess_onPress() { return _quickAccessOpen('dynajump'); }
function FN_54_colorToggle_onToggle(on)   { state.recolor = !!on; }
function FN_57_colorJoystick_onChange(s)  { config.recolorJoystick = !!s; }
function FN_58_colorQuickAccess_noop()    { return _quickAccessOpen('color'); }
function FN_59_camera_onToggle(on) {
    cameraMenuState = on;
    state.camera = on;
}
function FN_60_camera_quickAccess_onPress() { return _quickAccessOpen('camera'); }
function FN_61_spin_onToggle(on) {
    spinMenuState = on;
    state.autoSpin = on;
}
function FN_64_autoSpinAllowMoving_onChange(s) {
    autoSpinAllowMoving = !!s;
}
function FN_65_spin_quickAccess_onPress() { return _quickAccessOpen('spin'); }
function FN_66_fps_onToggle(on) {
    fpsMenuState = on;
    state.fps = on;
}
function FN_67_fps_quickAccess_onPress() { return _quickAccessOpen('fps'); }
function FN_68_pin_onToggle(on) {
    pinMenuState = on;
    state.pin = on;
}
function FN_69_pin_quickAccess_onPress() { return _quickAccessOpen('pin'); }
function FN_70_spectateSend_onPress() {
    return spectateByTag();
}
function FN_71_spectateBrawlTv_onChange(s) {
    spectateByTagUseBrawlTV = !!s;
}
function FN_72_spectate_quickAccess_onPress() {
    return _quickAccessOpen('spectateSendButton');
}
function setSpinSpeed(v) {
    spinSpeed = Math.max(0, Math.min(360, Math.floor(v)));
}
function setSpamWindowMs(v) {
    SPAM_WINDOW_MS = Math.max(0, Math.min(2000, Math.floor(v)));
}
function setSpinMenuState(on)       { spinMenuState = on; }
function setAutoSpinAllowMoving(on) { autoSpinAllowMoving = on; }
function setFpsMenuState(on)        { fpsMenuState = on; }
function setDynajumpDo4Jumps(on)    { Cheats.dynajumpDo4Jumps = !!on; }
function setDynajumpMenuState(on, _starter) {
    const wasOn = dynajumpMenuState;
    dynajumpMenuState = on;
    if (on && !wasOn && typeof _starter === 'function') _starter();
}
function ad_precSlider_onChange(p) {
    if (UIPopup && UIPopup[unicode.updateDodgePrecision]) {
        UIPopup[unicode.updateDodgePrecision](p);
    }
    if (ad_precLabel && typeof ad_precLabel.setText === 'function') {
        ad_precLabel.setText('Precision: ' + p.toFixed(2));
    }
}
function ad_marginSlider_onChange(v) {
    if (UIPopup) UIPopup.SAFETY_MARGIN = v;
    if (ad_marginLabel && typeof ad_marginLabel.setText === 'function') {
        ad_marginLabel.setText('Safety Margin: ' + v);
    }
}
function ad_lookupSlider_onChange(v) {
    if (UIPopup) UIPopup.SAFE_WALK_LOOKUP_BASE = v;
    if (ad_lookupLabel && typeof ad_lookupLabel.setText === 'function') {
        ad_lookupLabel.setText('SafeWalk Lookup: ' + v);
    }
}
function ad_ignoreRangeSlider_onChange(v) {
    if (UIPopup) UIPopup.AUTO_DODGE_MIN_RANGE = v;
    AUTO_DODGE_MIN_RANGE = v;
    if (ad_ignoreRangeLabel && typeof ad_ignoreRangeLabel.setText === 'function') {
        ad_ignoreRangeLabel.setText('Min Range: ' + v);
    }
}
function ad_ignoreSpreadSlider_onChange(v) {
    if (UIPopup) UIPopup.AUTO_DODGE_MAX_SPREAD = v;
    AUTO_DODGE_MAX_SPREAD = v;
    if (ad_ignoreSpreadLabel && typeof ad_ignoreSpreadLabel.setText === 'function') {
        ad_ignoreSpreadLabel.setText('Max Spread: ' + v);
    }
}
function ad_ignoreThrowers_onToggle(s) {
    if (UIPopup) UIPopup.AUTO_DODGE_IGNORE_THROWERS = s;
}
function autoDodgePopupClose() {
    if (UIPopup) {
        UIPopup.active = (UIPopup.active && UIPopup.active.popupKey || '') + 'autododge';
        if (typeof UIPopup.hide === 'function') UIPopup.hide();
    }
}
function FN_75_bgRed_onChange(v) {
    const lbl = UIPopup && UIPopup.find && UIPopup.find('lblRed');
    if (lbl && typeof lbl.setText === 'function') lbl.setText('Red: ' + v);
}
function FN_76_bgGreen_onChange(v) {
    const lbl = UIPopup && UIPopup.find && UIPopup.find('lblGreen');
    if (lbl && typeof lbl.setText === 'function') lbl.setText('Green: ' + v);
}
function FN_77_bgBlue_onChange(v) {
    const lbl = UIPopup && UIPopup.find && UIPopup.find('lblBlue');
    if (lbl && typeof lbl.setText === 'function') lbl.setText('Blue: ' + v);
}
function FN_78_textRed_onChange(v) {
    const lbl = UIPopup && UIPopup.find && UIPopup.find('t_lblRed');
    if (lbl && typeof lbl.setText === 'function') lbl.setText('Red: ' + v);
}
function FN_79_textGreen_onChange(v) {
    const lbl = UIPopup && UIPopup.find && UIPopup.find('t_lblGreen');
    if (lbl && typeof lbl.setText === 'function') lbl.setText('Green: ' + v);
}
function FN_80_textBlue_onChange(v) {
    const lbl = UIPopup && UIPopup.find && UIPopup.find('t_lblBlue');
    if (lbl && typeof lbl.setText === 'function') lbl.setText('Blue: ' + v);
}
function FN_27_settingsColor_onPress() {
    if (UIPopup && typeof UIPopup.show === 'function')
        return UIPopup.show('settingsColor');
}
function FN_28_settingsSize_onPress() {
    if (UIPopup && typeof UIPopup.show === 'function')
        return UIPopup.show('settingsSize');
}
function FN_29_settingsDistribution_onPress() {
    if (UIPopup && typeof UIPopup.show === 'function')
        return UIPopup.show('settingsDistribution');
}
function FN_26_quickAccessMaster_onToggle(on) {
    quickAccessUi.enabled = !!on;
    quickAccessUi.pendingTargetId = null;
    _quickAccessShowHide(quickAccessUi.slotsVisible);
}
function killAuraMinHealth_renderLabel(v) {
    try {
        const grp = tabMenuObjects.Cheats
                 && tabMenuObjects.Cheats.groups
                 && tabMenuObjects.Cheats.groups.killAuraGroup;
        if (!grp) return;
        const label = grp.find && grp.find('minHealthLabel');
        if (label) label.setText('Min HP: ' + Math.round(Number(v)) + '%');
    } catch (e) {}
}
function holdToShootFirstShotDelay_renderLabel(v) {
    try {
        const grp = tabMenuObjects.Cheats
                 && tabMenuObjects.Cheats.groups
                 && tabMenuObjects.Cheats.groups.holdToShootGroup;
        if (!grp) return;
        const label = grp.find && grp.find('h2sDelayLabel');
        if (label) label.setText('Delay: ' + Math.round(Number(v)) + 'ms');
    } catch (e) {}
}
function SPAM_WINDOW_MS_renderLabel(v) {
    try {
        const grp = tabMenuObjects.Misc
                 && tabMenuObjects.Misc.groups
                 && tabMenuObjects.Misc.groups.dynajumpGrup;
        if (!grp) return;
        const label = grp.find && grp.find('spamLabel');
        if (label) label.setText('Spam window: ' + Math.round(Number(v)) + 'ms');
    } catch (e) {}
}
function colorPicker_renderLabel(v) {
    try {
        const grp = tabMenuObjects.Visual
                 && tabMenuObjects.Visual.groups
                 && tabMenuObjects.Visual.groups.colorGroup;
        if (!grp) return;
        const label = grp.find && grp.find('precLabel');
        if (label) label.setText(String(v != null ? v : ''));
    } catch (e) {}
}
function spinSpeed_renderLabel(v) {
    try {
        const val = Number(v);
        if (Cheats && Cheats.autoSpin) Cheats.autoSpin.speed = val;
        spinSpeed = val;
        const grp = tabMenuObjects.Misc
                 && tabMenuObjects.Misc.groups
                 && tabMenuObjects.Misc.groups.spinGroup;
        if (!grp) return;
        const label = grp.find && grp.find('precLabelSpin');
        if (label) label.setText('Speed: ' + val.toFixed(2));
    } catch (e) {}
}
function lastPositionsSampler() {
    try {
        if (!state.natives || !state.natives.LogicGameObjectClient_getX
            || !state.natives.LogicGameObjectClient_getY) return;
        if (!state.natives.BattleMode_getInstance) return;
        const bm = state.natives.BattleMode_getInstance();
        if (!isValidPtr(bm)) return;
        if (!state.natives.BattleScreen_getLogicBattleModeClient) return;
        const bmc = state.natives.BattleScreen_getLogicBattleModeClient(bm);
        if (!isValidPtr(bmc)) return;
        if (!state.natives.LogicBattleModeClient_getOwnCharacter) return;
        const own = state.natives.LogicBattleModeClient_getOwnCharacter(bmc);
        if (!isValidPtr(own)) return;
        const x = state.natives.LogicGameObjectClient_getX(own);
        const y = state.natives.LogicGameObjectClient_getY(own);
        if (typeof x !== 'number' || typeof y !== 'number') return;
        const now = Date.now();
        latestX = x;
        latestY = y;
        state.myPosX = x;
        state.myPosY = y;
        if (lastTimeMs != null) {
            const dt = now - lastTimeMs;
            if (dt > 0) {
                timeDiffs.push(dt);
                while (timeDiffs.length > lastpositionsLen) timeDiffs.shift();
            }
        }
        lastTimeMs = now;
    } catch (e) {}
}
let stageAddChildReady = false;
const pendingStageAdds = [];
function _ensureStageAddChildReady(cb) {
    if (stageAddChildReady) { if (cb) safeCall(cb); return; }
    const tick = function () {
        try {
            if (isValidPtr(STAGE_PTR)) {
                stageAddChildReady = true;
                clearInterval(handle);
                if (cb) safeCall(cb);
                while (pendingStageAdds.length) {
                    const p = pendingStageAdds.shift();
                    try { if (Stage_addChild) Stage_addChild(STAGE_PTR, p); } catch (e) {}
                }
            }
        } catch (e) {}
    };
    const handle = setInterval(tick, 100);
}
ensureStageAddChildReady = _ensureStageAddChildReady;
function waitForStageAddChildReady(callback, intervalMs) {
    if (typeof callback === 'function') {
        _ensureStageAddChildReady(callback);
    } else {
        return new Promise(function (resolve) { _ensureStageAddChildReady(resolve); });
    }
}
function _newGameButtonFromClip(clip) {
    if (!isValidPtr(clip)) return null;
    if (!operator_new) {
        if (!malloc) return null;
        try {
            const buttonMem = malloc(0x140);
            if (!isValidPtr(buttonMem)) return null;
            try { if (memset) memset(buttonMem, 0, 0x140); } catch (e) {}
            if (GameButton_ctor) {
                try {
                    const ctor = new NativeFunction(GameButton_ctor, 'pointer', ['pointer', 'pointer']);
                    ctor(buttonMem, clip);
                } catch (e) {}
            }
            BUTTON_TO_CLIP.set(buttonMem.toString(), clip);
            return buttonMem;
        } catch (e) { return null; }
    }
    try {
        const buttonMem = operator_new(0x140);
        if (!isValidPtr(buttonMem)) return null;
        try { if (memset) memset(buttonMem, 0, 0x140); } catch (e) {}
        try {
            if (GameButton_ctor) {
                const ctor = new NativeFunction(GameButton_ctor, 'pointer', ['pointer', 'pointer']);
                ctor(buttonMem, clip);
            }
        } catch (e) {
            try {
                if (GameButton_ctor) {
                    const ctor3 = new NativeFunction(GameButton_ctor, 'pointer',
                        ['pointer', 'pointer', 'pointer']);
                    ctor3(buttonMem, clip, NULL);
                }
            } catch (e2) {}
        }
        try {
            const vtable = buttonMem.readPointer();
            if (!isValidPtr(vtable)) return null;
        } catch (e) { return null; }
        BUTTON_TO_CLIP.set(buttonMem.toString(), clip);
        if (dropGUIContainer_addGameButton) {
            try { dropGUIContainer_addGameButton(NULL, buttonMem, 0); } catch (e) {}
        }
        return buttonMem;
    } catch (e) {
        try { console.warn('[newGameButtonFromClip] ' + e); } catch (_) {}
        return null;
    }
}
newGameButtonFromClip = _newGameButtonFromClip;
function _bumpWidget(widget) {
    if (!widget) return;
    const target = widget.ptr || widget.btn || widget.container || widget.group;
    if (!isValidPtr(target)) return;
    let step = 0;
    const handle = setInterval(function () {
        step++;
        let s;
        if (step < 8)       s = 0.8 + 0.25 * (step / 8);
        else if (step < 12) s = 1.05;
        else                s = 1.05 - 0.05 * ((step - 12) / 4);
        safeSetScale(target, s, s);
        if (step >= 16) {
            safeSetScale(target, 1.0, 1.0);
            clearInterval(handle);
        }
    }, 16);
}
bumpWidget = _bumpWidget;
function _createCustomTabSprite(tabName, stateFrame) {
    if (!StringTable_getMovieClip) return null;
    const popupTabs = safeCall(StringTable_getMovieClip,
                               strPtr('sc/ui.sc'), strPtr('popup_news_tabs'));
    if (!isValidPtr(popupTabs)) return null;
    const tabChild = getChildClip(popupTabs, 'tab');
    if (!isValidPtr(tabChild)) return null;
    const bgClip = safeCall(StringTable_getMovieClip,
                            strPtr('sc/ui.sc'), strPtr('map_editor_exit_button'));
    if (!isValidPtr(bgClip)) return null;
    const textField = safeCall(MovieClip_getTextFieldByName, tabChild, strPtr('txt'));
    if (isValidPtr(textField)) {
        safeCall(MovieClipHelper_setTextAndScaleIfNecessary,
                 textField, scPtr(tabName), 2.24, 1.12);
    }
    let iconName, iconScaleX = 1.0, iconScaleY = 1.0;
    switch (tabName) {
        case 'Home':
            iconName = 'fame_profile_screen_header';
            iconScaleX = 0.50; iconScaleY = 0.70;
            break;
        case 'Cheats':
            iconName = 'event_icon_takedown';
            iconScaleX = iconScaleY = 0.35;
            break;
        case 'Visual':
            iconName = 'event_icon_takedown';
            iconScaleX = 0.50; iconScaleY = 0.70;
            break;
        case 'Misc':
            iconName = 'popover_button_spectate';
            iconScaleX = 0.41; iconScaleY = 0.80;
            break;
        default:
            iconName = 'icon_skins_toys';
    }
    const iconClip = safeCall(StringTable_getMovieClip,
                              strPtr('sc/ui.sc'), strPtr(iconName));
    if (isValidPtr(iconClip)) safeSetScale(iconClip, iconScaleX, iconScaleY);
    if (!malloc) return null;
    const sprite = malloc(0x80);
    try { if (memset) memset(sprite, 0, 0x80); } catch (e) {}
    try { if (Sprite_ctor) Sprite_ctor(sprite, 0); } catch (e) {}
    if (isValidPtr(bgClip)   && Sprite_addChild) safeCall(Sprite_addChild, sprite, bgClip);
    if (isValidPtr(iconClip) && Sprite_addChild) safeCall(Sprite_addChild, sprite, iconClip);
    if (isValidPtr(tabChild) && Sprite_addChild) safeCall(Sprite_addChild, sprite, tabChild);
    if (gotoAndStop) safeCall(gotoAndStop, sprite, stateFrame || 0);
    return sprite;
}
createCustomTabSprite = _createCustomTabSprite;
function createTabButton(tabName, stateFrame, onPress) {
    const sprite = _createCustomTabSprite(tabName, stateFrame || 0);
    if (!isValidPtr(sprite)) return null;
    if (!tabMenuObjects[tabName]) tabMenuObjects[tabName] = {};
    tabMenuObjects[tabName].sprite = sprite;
    tabMenuObjects[tabName].onPress = onPress;
    if (!tabMenuObjects[tabName].groups) tabMenuObjects[tabName].groups = {};
    return sprite;
}
function _ensureTabObjectsCreated() {
    const names = TABS_CONFIG.map;
    for (let i = 0; i < names.length; i++) {
        const tabName = names[i];
        if (!tabMenuObjects[tabName] || !tabMenuObjects[tabName].sprite) {
            createTabButton(tabName, 0, (function (n) {
                return function () { activateTab(n); };
            })(tabName));
        }
    }
}
ensureTabObjectsCreated = _ensureTabObjectsCreated;
function activateTab(tabName) {
    Object.keys(tabMenuObjects).forEach(function (name) {
        const tab = tabMenuObjects[name];
        if (!tab) return;
        if (tab.group && tab.group.hide) tab.group.hide();
        if (tab.groups) {
            for (const k in tab.groups) {
                if (tab.groups[k] && tab.groups[k].hide) tab.groups[k].hide();
            }
        }
        if (isValidPtr(tab.sprite) && gotoAndStop) safeCall(gotoAndStop, tab.sprite, 0);
    });
    const target = tabMenuObjects[tabName];
    if (target) {
        if (target.group && target.group.show) target.group.show();
        if (target.groups) {
            for (const k in target.groups) {
                if (target.groups[k] && target.groups[k].show) target.groups[k].show();
            }
        }
        if (isValidPtr(target.sprite) && gotoAndStop) safeCall(gotoAndStop, target.sprite, 2);
        if (activeTabText && typeof activeTabText.setText === 'function')
            activeTabText.setText(tabName);
    }
}
function _applyTextStyling(arg, cfg) {
    if (cfg) {
        const tfPtr = arg;
        if (!isValidPtr(tfPtr)) return;
        try {
            if (typeof cfg.scaleX === 'number')
                tfPtr.add(0x2A30).writeFloat(cfg.scaleX);
            if (typeof cfg.scaleY === 'number')
                tfPtr.add(0x2A3C).writeFloat(cfg.scaleY);
            if (typeof cfg.color === 'number')
                tfPtr.add(0x2A50).writeU32(cfg.color >>> 0);
            if (typeof cfg.outline === 'number')
                tfPtr.add(0x2A54).writeU32(cfg.outline >>> 0);
        } catch (e) {}
        return;
    }
    const info = arg;
    if (!info) return;
    if (info.clip && isValidPtr(info.clip)) {
        const clip = info.clip;
        const tryNames = ['txt', 'title_txt', 'text', 'label'];
        let tf = null;
        for (let i = 0; i < tryNames.length; i++) {
            const cand = safeCall(MovieClip_getTextFieldByName, clip, strPtr(tryNames[i]));
            if (isValidPtr(cand)) { tf = cand; break; }
        }
        if (!isValidPtr(tf)) return;
        const txt    = info.text != null ? String(info.text) : '';
        const scaleX = Number(info.scaleX != null ? info.scaleX
                              : info.scale != null ? info.scale : 1);
        const scaleY = Number(info.scaleY != null ? info.scaleY
                              : info.scale != null ? info.scale : 1);
        if (MovieClipHelper_setTextAndScaleIfNecessary)
            safeCall(MovieClipHelper_setTextAndScaleIfNecessary, tf, scPtr(txt), scaleX, scaleY);
        safeSetScale(clip, scaleX, scaleY);
        const x = Number(info.x != null ? info.x : 0) + Number(LABEL_NUDGE || 0);
        const y = Number(info.y != null ? info.y : 0);
        setXYSafe(clip, x, y);
        return;
    }
    const clip = info.sprite_active || info.sprite_normal;
    if (!isValidPtr(clip)) return;
    const text = info.text || info.name || '';
    const scaleY = Number(info.scaleY != null ? info.scaleY
                   : (info.scale != null ? info.scale : 1.0));
    const scaleX = Number(info.scaleX != null ? info.scaleX
                   : (info.scale != null ? info.scale : 1.0));
    const frame = info.frame != null ? Number(info.frame) : null;
    if (frame != null && frame >= 0 && gotoAndStop)
        safeCall(gotoAndStop, clip, frame);
    let tf = safeCall(MovieClip_getTextFieldByName, clip, strPtr('tab'));
    if (!isValidPtr(tf)) tf = safeCall(MovieClip_getTextFieldByName, clip, strPtr('text'));
    if (!isValidPtr(tf)) tf = safeCall(MovieClip_getTextFieldByName, clip, strPtr('label'));
    if (!isValidPtr(tf)) return;
    if (MovieClipHelper_setTextAndScaleIfNecessary)
        safeCall(MovieClipHelper_setTextAndScaleIfNecessary, tf, scPtr(String(text)), 1, 1);
    safeSetScale(tf, scaleY, scaleX);
    const nudge = (typeof LABEL_NUDGE === 'number') ? LABEL_NUDGE : 0;
    if (info.x != null && info.y != null)
        setXYSafe(tf, Number(info.x) + nudge, Number(info.y));
}
applyTextStyling = _applyTextStyling;
function buildPopupChildSpec(item, popupX, popupY, contentOX, contentOY) {
    if (contentOX === undefined) contentOX = 0;
    if (contentOY === undefined) contentOY = 0;
    const out = Object.assign({}, item || {});
    out.x = (Number(popupX) || 0) + (Number(contentOX) || 0)
          + (Number(item && item.xOffset) || 0);
    out.y = (Number(popupY) || 0) + (Number(contentOY) || 0)
          + (Number(item && item.yOffset) || 0);
    delete out.xOffset;
    delete out.yOffset;
    return out;
}
function _setLabel(key, text) {
    if (!isValidPtr(currentPopup)) return;
    const tf = findTextFieldDeep(currentPopup, key, 6);
    if (isValidPtr(tf)) {
        try {
            if (movieClip_setText) movieClip_setText(tf, scPtr(text), NULL);
            else if (MovieClipHelper_setTextAndScaleIfNecessary)
                MovieClipHelper_setTextAndScaleIfNecessary(tf, scPtr(text), 1, 1);
        } catch (e) {}
    }
}
setLabel = _setLabel;
function showWidgetThunk(p) {
    if (!isValidPtr(p)) return;
    setVisible(p, 1);
}
function setTitleText(text) {
    if (!findTextFieldAnywhere) return false;
    const tf = findTextFieldAnywhere(this, ['title_txt', 'txt_title', 'title']);
    if (!isValidPtr(tf)) return false;
    if (MovieClipHelper_setTextAndScaleIfNecessary)
        safeCall(MovieClipHelper_setTextAndScaleIfNecessary, tf, scPtr(text), 1.0, 1.0);
    return true;
}
function findSliderVisuals(root) {
    if (!isValidPtr(root)) return null;
    const sliders_container = safeCall(MovieClip_getChildByName,
                                       root, strPtr('sliders'));
    if (!isValidPtr(sliders_container)) return null;
    let container = safeCall(MovieClip_getChildByName,
                             sliders_container, strPtr('slider_opacity'));
    if (!isValidPtr(container)) {
        container = safeCall(MovieClip_getChildByName,
                             sliders_container, strPtr('slider_bg'));
    }
    if (!isValidPtr(container)) return null;
    let knob = safeCall(MovieClip_getChildByName, container, strPtr('slider_button'));
    if (!isValidPtr(knob))
        knob = safeCall(MovieClip_getChildByName, container, strPtr('slider_knob'));
    if (!isValidPtr(knob)) return null;
    return {
        sliders_container: sliders_container,
        container: container,
        knob: knob,
    };
}
function createButtonWidget(spec) {
    if (!StringTable_getMovieClip) return null;
    const clip = safeCall(StringTable_getMovieClip,
                          strPtr('sc/ui.sc'), strPtr('popover_button'));
    if (!isValidPtr(clip)) {
        try { console.error('Button Error: missing popover_button'); } catch (_) {}
        return null;
    }
    const btn = newGameButtonFromClip(clip);
    if (!btn) {
        try { console.error('Button Error: GameButton init failed'); } catch (_) {}
        return null;
    }
    let textField = _findTextFieldAnywhere(clip, ['txt', 'Text', 'label', 'title_txt']);
    if (textField && spec.gradient && LogicDataTables_getColorGradientByName) {
        const gradient = safeCall(LogicDataTables_getColorGradientByName,
                                  strPtr(spec.gradient), 0);
        if (isValidPtr(gradient) && DecoratedTextField_setupDecoratedText)
            safeCall(DecoratedTextField_setupDecoratedText, textField, gradient, NULL);
    }
    const s = Number(spec.scale || 1);
    safeSetScale(btn, s, s);
    const label = scPtr(spec.text || '');
    if (textField && MovieClipHelper_setTextAndScaleIfNecessary)
        safeCall(MovieClipHelper_setTextAndScaleIfNecessary, textField, label, 1, 1);
    try { if (GameButton_setText) GameButton_setText(btn, label, 1); } catch (e) {}
    const widget = {
        type:   'button',
        key:    spec.key,
        ptr:    btn,
        label:  spec.key,
        show:   function () { setVisible(btn, true);  setXYSafe(btn, spec.x, spec.y); },
        hide:   function () { setVisible(btn, false); },
        move:   function (x, y) { setXYSafe(btn, Number(x), Number(y)); },
        handlePress: function (p) {
            if (isValidPtr(btn) && p && p.equals && p.equals(btn))
                safeCall(spec.onPress, spec);
        },
        onPress: function () { safeCall(spec.onPress); },
    };
    widget.hide();
    return widget;
}
function createBlueButtonWidget(spec) {
    if (!StringTable_getMovieClip) return null;
    const candidates = ['popover_button_blue', 'popover_button_spectate', 'country_item'];
    let clip = null;
    for (let i = 0; i < candidates.length; i++) {
        const c = safeCall(StringTable_getMovieClip,
                           strPtr('sc/ui.sc'), strPtr(candidates[i]));
        if (isValidPtr(c)) { clip = c; break; }
    }
    if (!clip) {
        try { console.error('BlueButton Error: no usable button asset'); } catch (_) {}
        return null;
    }
    const btn = newGameButtonFromClip(clip);
    if (!btn) {
        try { console.error('BlueButton Error: button init failed'); } catch (_) {}
        return null;
    }
    let textField = _findTextFieldAnywhere(clip, ['txt', 'Text', 'label', 'title_txt']);
    const txt = scPtr(spec.text || 'Send');
    if (textField && MovieClipHelper_setTextAndScaleIfNecessary)
        safeCall(MovieClipHelper_setTextAndScaleIfNecessary, textField, txt, 1, 1);
    try { if (GameButton_setText) GameButton_setText(btn, txt, 1); } catch (e) {}
    const s = Number(spec.scale || 1);
    safeSetScale(btn, s, s);
    const widget = {
        type:   'bluebutton',
        key:    spec.key,
        ptr:    btn,
        label:  spec.key,
        show:   function () { setVisible(btn, true); setXYSafe(btn, spec.x, spec.y); },
        hide:   function () { setVisible(btn, false); },
        move:   function (x, y) { setXYSafe(btn, Number(x), Number(y)); },
        handlePress: function (p) {
            if (isValidPtr(btn) && p && p.equals && p.equals(btn))
                safeCall(spec.onPress, spec);
        },
        onPress: function () { safeCall(spec.onPress); },
    };
    if (spec.quickAccessId) _quickAccessRegisterTarget(spec, widget);
    widget.hide();
    return widget;
}
function _createTextWidget(spec) {
    if (!StringTable_getMovieClip) return null;
    const clip = safeCall(StringTable_getMovieClip,
                          strPtr('sc/ui.sc'), strPtr('textbox_1'));
    if (!isValidPtr(clip)) {
        try { console.error('Text Error: missing textbox_1'); } catch (_) {}
        return null;
    }
    const tryNames = spec.field
        ? [spec.field, 'txt', 'text', 'label', 'title_txt', 'text_txt']
        : ['txt', 'text', 'label', 'title_txt', 'text_txt'];
    let tf = null;
    for (let i = 0; i < tryNames.length; i++) {
        const cand = safeCall(MovieClip_getTextFieldByName, clip, strPtr(tryNames[i]));
        if (isValidPtr(cand)) { tf = cand; break; }
    }
    const pos = { x: Number(spec.x || 0), y: Number(spec.y || 0) };
    function setText(s) {
        if (isValidPtr(tf) && MovieClipHelper_setTextAndScaleIfNecessary)
            safeCall(MovieClipHelper_setTextAndScaleIfNecessary, tf, scPtr(s), 1, 1);
    }
    if (spec.text != null) setText(String(spec.text));
    function applyTextScale() {
        const sy = Math.max(0.01, Number(spec.textScaleY || spec.textScale ||
                            spec.scaleY || spec.scale || 1));
        const sx = Math.max(0.01, Number(spec.textScaleX || spec.textScale ||
                            spec.scaleX || spec.scale || 1));
        if (isValidPtr(tf)) {
            try {
                tf.add(0x2A30).writeFloat(sx);
                tf.add(0x2A3C).writeFloat(sy);
            } catch (e) {}
        }
    }
    function applyBoxScale() {
        const by = Number(spec.boxScaleY || spec.boxScale || 1);
        const bx = Number(spec.boxScaleX || spec.boxScale || 1);
        safeSetScale(clip, bx, by);
    }
    const widget = {
        type:   'text',
        key:    spec.key,
        ptr:    clip,
        show:   function () {
            setVisible(clip, true);
            setInteractive(clip, false);
            applyBoxScale();
            applyTextScale();
            setXYSafe(clip, pos.x, pos.y);
            bringToFront(clip);
        },
        hide:   function () { setVisible(clip, false); },
        move:   function (x, y) {
            pos.x = Number(x); pos.y = Number(y);
            setXYSafe(clip, pos.x, pos.y);
        },
        setText: setText,
        setTextScale: function (t) { spec.textScale = t; applyTextScale(); },
        setTextScaleXY: function (ty, tx) {
            spec.textScaleY = ty; spec.textScaleX = tx; applyTextScale();
        },
        setBoxScale: function (by, bx) {
            spec.boxScaleY = by; spec.boxScaleX = bx; applyBoxScale();
        },
    };
    widget.hide();
    return widget;
}
createTextWidget = _createTextWidget;
function createInputWidget(spec) {
    if (!operator_new || !GenericPopup_GenericPopup) return null;
    const popup = operator_new(424);
    try { if (memset) memset(popup, 0, 424); } catch (e) {}
    try { GenericPopup_GenericPopup(popup, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL); } catch (e) {}
    try { if (SpectatePopupVTable) popup.writePointer(SpectatePopupVTable); } catch (e) {}
    const inputContainer = safeCall(StringTable_getMovieClip,
                                    strPtr('sc/ui.sc'),
                                    strPtr('gameroom_joincode_popup'));
    if (!isValidPtr(inputContainer)) {
        try { console.error('Input Error: missing gameroom_joincode_popup'); } catch (_) {}
        return null;
    }
    const movieClip = safeCall(MovieClip_getChildByName,
                               inputContainer, strPtr('team_code_input'));
    if (!isValidPtr(movieClip)) {
        try { console.error('Input Error: missing team_code_input'); } catch (_) {}
        return null;
    }
    let tf = safeCall(MovieClip_getTextFieldByName, movieClip, strPtr('text'));
    if (!isValidPtr(tf))
        tf = safeCall(MovieClip_getTextFieldByName, movieClip, strPtr('teamcode_txt'));
    if (!isValidPtr(tf)) {
        try { console.error('Input Error: missing text field'); } catch (_) {}
        return null;
    }
    const pos       = { x: Number(spec.x || 0), y: Number(spec.y || 0) };
    const layoutPos = { x: pos.x, y: pos.y };
    const scaleY    = Number(spec.scaleY || spec.scale || 0.5);
    const scaleX    = Number(spec.scaleX || spec.scale || 0.5);
    const boxScaleY = Number(spec.boxScaleY || 0.65);
    const boxScaleX = Number(spec.boxScaleX || 0.65);
    const MAX_TAG_LENGTH = Math.max(2, Math.min(25, Number(spec.maxLength || spec.maxLen || 25)));
    let currentText = String(spec.text || '');
    let inputField = null;
    try {
        inputField = operator_new(200);
        try { if (memset) memset(inputField, 0, 200); } catch (e) {}
        if (GameInputField_GameInputField)
            GameInputField_GameInputField(inputField, tf, NULL, NULL);
        if (GameInputField_setMaxTextLength)
            GameInputField_setMaxTextLength(inputField, NULL, MAX_TAG_LENGTH);
        try { tf.add(408).writePointer(inputField); } catch (e) {}
    } catch (e) {}
    let setInputFieldText = null;
    try {
        if (isValidPtr(inputField)) {
            const inputFieldVTable = inputField.readPointer();
            const setTextFuncPtr   = inputFieldVTable.add(0x2A30).readPointer();
            setInputFieldText = new NativeFunction(setTextFuncPtr, 'void', ['pointer', 'pointer']);
        }
    } catch (e) {}
    function readCurrentText() {
        try {
            let typed = extractTypedTag(tf.add(0x12C).readPointer());
            if (!typed && isValidPtr(inputField)) typed = extractTypedTag(inputField.add(0xC8).readPointer());
            if (typed) currentText = '#' + (typed.id && typed.id.raw
                ? typed.id.raw.toString(36).toUpperCase()
                : String(typed.id).toUpperCase());
        } catch (e) {}
        return currentText;
    }
    function setText(s) {
        currentText = String(s || '');
        if (isValidPtr(tf) && isValidPtr(inputField)) {
            if (setInputFieldText) {
                try { setInputFieldText(inputField, scPtr(currentText)); } catch (e) {}
            }
            try {
                if (MovieClipHelper_setTextAndScaleIfNecessary)
                    MovieClipHelper_setTextAndScaleIfNecessary(tf, scPtr(currentText), scaleY, scaleX);
            } catch (e) {}
        }
    }
    const widget = {
        type:       'input',
        key:        spec.key,
        ptr:        popup,
        textField:  tf,
        inputField: inputField,
        popup:      popup,
        clip:       inputContainer,
        show: function () {
            pos.x = layoutPos.x; pos.y = layoutPos.y;
            setVisible(inputContainer, true);
            safeSetScale(inputContainer, boxScaleX, boxScaleY);
            setXYSafe(inputContainer, pos.x, pos.y);
            setText(currentText);
            bringToFront(inputContainer);
        },
        hide: function () {
            setVisible(inputContainer, false);
            readCurrentText();
        },
        move: function (x, y) {
            pos.x = layoutPos.x = Number(x);
            pos.y = layoutPos.y = Number(y);
            setXYSafe(inputContainer, pos.x, pos.y);
        },
        getText: function () { return readCurrentText(); },
        setText: setText,
        handlePress: function (p) {
            if (isValidPtr(inputContainer) && p && p.equals && p.equals(inputContainer))
                safeCall(widget.onPress);
        },
    };
    widget.hide();
    return widget;
}
function createSliderWidget(spec) {
    if (!StringTable_getMovieClip) return null;
    const root = safeCall(StringTable_getMovieClip,
                          strPtr('sc/ui.sc'),
                          strPtr('edit_controls_ui_screen_center'));
    if (!isValidPtr(root)) return null;
    const visuals = findSliderVisuals(root);
    if (!visuals || !visuals.container || !visuals.knob) return null;
    const sliders_container = visuals.sliders_container;
    const container         = visuals.container;
    const knob              = visuals.knob;
    ['slider_scale', 'TID_EDIT_CONTROLS_OPACITY_INFO',
     'hint_props_txt', 'hint_drag_txt'].forEach(function (n) {
        hideChildByName(sliders_container, n);
    });
    const sY = Number(spec.scaleY || spec.scale || 1);
    const sX = Number(spec.scaleX || spec.scale || 1);
    const COMP_SIZE = 368;
    if (!malloc) return null;
    const comp = malloc(COMP_SIZE);
    try {
        const zeroBuffer = new Uint8Array(COMP_SIZE);
        comp.writeByteArray(zeroBuffer);
    } catch (e) {}
    try { if (GameSliderComponent_ctor) GameSliderComponent_ctor(comp, container, knob, 0, 0); } catch (e) {}
    const min     = Number(spec.min     != null ? spec.min     : 0);
    const max     = Number(spec.max     != null ? spec.max     : 100);
    const initial = Number(spec.initial != null ? spec.initial : 50);
    try { if (GameSliderComponent_setBounds) GameSliderComponent_setBounds(comp, min, max); } catch (e) {}
    try { comp.add(SL_FIELD.visible).writeU8(1); } catch (e) {}
    try { comp.add(SL_FIELD.get).writeS32(initial); } catch (e) {}
    try { if (GameSlider_refreshLogic) GameSlider_refreshLogic(comp); } catch (e) {}
    const widget = {
        type:         'slider',
        key:          spec.key,
        rootTemplate: root,
        group:        sliders_container,
        container:    container,
        knob:         knob,
        mem:          comp,
        lastValue:    initial,
        show: function () {
            setVisible(sliders_container, true);
            setInteractive(sliders_container, true);
            setVisible(container, true);   setInteractive(container, false);
            setVisible(knob, true);        setInteractive(knob, false);
            setXYSafe(sliders_container, Number(spec.x || 0), Number(spec.y || 0));
            safeSetScale(sliders_container, sX, sY);
            if (activeSliders.indexOf(widget) < 0) activeSliders.push(widget);
        },
        hide: function () {
            setVisible(sliders_container, false);
            setVisible(container, false);
            setVisible(knob, false);
            setInteractive(container, false);
            setInteractive(knob, false);
            const idx = activeSliders.indexOf(widget);
            if (idx >= 0) activeSliders.splice(idx, 1);
        },
        move: function (x, y) {
            setXYSafe(sliders_container, Number(x), Number(y));
        },
        pump: function () {
            try {
                const val = comp.add(SL_FIELD.get).readS32();
                if (val !== widget.lastValue) {
                    widget.lastValue = val;
                    safeCall(spec.onChange, val);
                }
            } catch (e) {}
        },
    };
    widget.hide();
    return widget;
}
function createToggleWidget(spec) {
    if (!StringTable_getMovieClip) return null;
    const parentA = safeCall(StringTable_getMovieClip,
                             strPtr('sc/ui.sc'), strPtr(TOGGLE_PARENT_EXPORT));
    const parentB = safeCall(StringTable_getMovieClip,
                             strPtr('sc/ui.sc'), strPtr(TOGGLE_PARENT_EXPORT));
    if (!isValidPtr(parentA) || !isValidPtr(parentB)) return null;
    const childA = safeCall(MovieClip_getChildByName, parentA, strPtr(TOGGLE_CHILD_EXPORT));
    const childB = safeCall(MovieClip_getChildByName, parentB, strPtr(TOGGLE_CHILD_EXPORT));
    if (!isValidPtr(childA) || !isValidPtr(childB)) return null;
    const onText  = scPtr(spec.onLabel  || 'On');
    const offText = scPtr(spec.offLabel || 'Off');
    function setField(clip, field, txt) {
        const tf = safeCall(MovieClip_getTextFieldByName, clip, strPtr(field));
        if (isValidPtr(tf) && MovieClipHelper_setTextAndScaleIfNecessary)
            safeCall(MovieClipHelper_setTextAndScaleIfNecessary, tf, txt, 1, 1);
    }
    setField(childA, TOGGLE_FIELD_ON,  onText);
    setField(childA, TOGGLE_FIELD_OFF, offText);
    setField(childB, TOGGLE_FIELD_ON,  onText);
    setField(childB, TOGGLE_FIELD_OFF, offText);
    const btnOff = newGameButtonFromClip(parentA);
    const btnOn  = newGameButtonFromClip(parentB);
    if (!btnOff || !btnOn) return null;
    const s = Number(spec.scale || 1);
    safeSetScale(btnOff, s, s);
    safeSetScale(btnOn,  s, s);
    let toggleState = !!spec.initial;
    let visible     = false;
    const pos       = { x: Number(spec.x || 0), y: Number(spec.y || 0) };
    const layoutPos = { x: pos.x, y: pos.y };
    function showBtn(btn, clip) {
        setVisible(btn, true);
        setInteractive(clip, true);
        setXYSafe(btn, layoutPos.x, layoutPos.y);
        bringToFront(btn);
    }
    function hideBtn(btn, clip) {
        setInteractive(clip, false);
        setVisible(btn, false);
    }
    function applyState() {
        if (!visible) {
            hideBtn(btnOn,  childB);
            hideBtn(btnOff, childA);
            return;
        }
        if (toggleState) { showBtn(btnOn,  childB); hideBtn(btnOff, childA); }
        else             { showBtn(btnOff, childA); hideBtn(btnOn,  childB); }
    }
    function setStateInner(v, silent) {
        toggleState = !!v;
        applyState();
        if (!silent) safeCall(spec.onToggle, toggleState);
        if (quickAccessRefresh) quickAccessRefresh();
    }
    const widget = {
        type:   'toggle',
        key:    spec.key,
        ptrOn:  btnOn,
        ptrOff: btnOff,
        ptr:    btnOff,
        label:  spec.key,
        show:   function () { visible = true;  applyState(); },
        hide:   function () { visible = false; hideBtn(btnOn, childB); hideBtn(btnOff, childA); },
        move:   function (x, y) {
            pos.x = layoutPos.x = Number(x);
            pos.y = layoutPos.y = Number(y);
            applyState();
        },
        getState: function () { return toggleState; },
        setState: function (v, silent) { setStateInner(v, !!silent); },
        toggle:   function (silent)    { setStateInner(!toggleState, !!silent); },
        handlePress: function (p) {
            if (isValidPtr(btnOff) && p && p.equals && p.equals(btnOff) && !toggleState)
                setStateInner(true);
            else if (isValidPtr(btnOn) && p && p.equals && p.equals(btnOn) && toggleState)
                setStateInner(false);
        },
    };
    if (spec.quickAccessId) _quickAccessRegisterTarget(spec, widget);
    widget.hide();
    return widget;
}
function createLockRadioWidget(spec) {
    if (!StringTable_getMovieClip) return null;
    const parent = safeCall(StringTable_getMovieClip,
                            strPtr('sc/ui.sc'), strPtr('edit_controls_ui'));
    if (!isValidPtr(parent)) return null;
    const clip = safeCall(MovieClip_getChildByName, parent,
                          strPtr('locked_movement_controls_button'));
    if (!isValidPtr(clip)) return null;
    const stateClip = safeCall(MovieClip_getChildByName, clip, strPtr('state'));
    const btn       = newGameButtonFromClip(clip);
    if (!btn) return null;
    const sBtn = Number(spec.scale || 1);
    safeSetScale(btn, sBtn, sBtn);
    let radioState = !!spec.state;
    if (isValidPtr(stateClip) && gotoAndStop)
        safeCall(gotoAndStop, stateClip, radioState ? 2 : 1);
    const lblScale = Number(spec.textScale || 1);
    const pos       = { x: Number(spec.x || 0), y: Number(spec.y || 0) };
    const layoutPos = { x: pos.x, y: pos.y };
    function labelAt(x, y) {
        return {
            x: Number(x) + Number(spec.textOffsetX || 0),
            y: Number(y) + Number(spec.textOffsetY || 0),
        };
    }
    let labelPos = labelAt(pos.x, pos.y);
    const labelSpec = {
        type:    'text',
        key:     spec.key + '_label',
        text:    spec.text || 'Option 1',
        x:       labelPos.x,
        y:       labelPos.y,
        scaleX:  lblScale,
        scaleY:  lblScale,
    };
    const labelWidget = _createTextWidget(labelSpec);
    function setStateInner(newState, silent) {
        radioState = !!newState;
        if (isValidPtr(stateClip) && gotoAndStop)
            safeCall(gotoAndStop, stateClip, radioState ? 2 : 1);
        if (!silent) safeCall(spec.onChange || spec.onToggle, radioState);
        if (quickAccessRefresh) quickAccessRefresh();
    }
    const widget = {
        type:        'lockradio',
        key:         spec.key,
        btn:         btn,
        ptr:         btn,
        stateClip:   stateClip,
        labelWidget: labelWidget,
        label:       spec.key,
        show: function () {
            bringToFront(btn);
            setVisible(btn, true);
            setXYSafe(btn, layoutPos.x, layoutPos.y);
            safeSetScale(btn, sBtn, sBtn);
            if (labelWidget) {
                labelWidget.show();
                labelWidget.move(labelPos.x, labelPos.y);
            }
        },
        hide: function () {
            setVisible(btn, false);
            if (labelWidget) labelWidget.hide();
        },
        move: function (x, y) {
            pos.x = layoutPos.x = Number(x);
            pos.y = layoutPos.y = Number(y);
            setXYSafe(btn, pos.x, pos.y);
            labelPos = labelAt(pos.x, pos.y);
            if (labelWidget) labelWidget.move(labelPos.x, labelPos.y);
        },
        setText: function (t) { if (labelWidget) labelWidget.setText(t); },
        getState: function () { return radioState; },
        setState: function (v, silent) { setStateInner(v, !!silent); },
        toggle:   function (silent)    { setStateInner(!radioState, !!silent); },
        handlePress: function (p) {
            if (isValidPtr(btn) && p && p.equals && p.equals(btn))
                setStateInner(!radioState);
        },
    };
    if (spec.quickAccessId) _quickAccessRegisterTarget(spec, widget);
    widget.hide();
    return widget;
}
function createGroupBgWidget(spec) {
    const sprName = spec.integer || 'tabbed_chat_event_negative';
    const clip = safeCall(StringTable_getMovieClip,
                          strPtr('sc/ui.sc'), strPtr(sprName));
    if (!isValidPtr(clip)) return null;
    if (spec.frame !== undefined && spec.frame !== null && gotoAndStop)
        safeCall(gotoAndStop, clip, Number(spec.frame));
    if (!malloc) return null;
    const container = malloc(0x400);
    if (!isValidPtr(container)) return null;
    try { if (memset) memset(container, 0, 0x400); } catch (e) {}
    try { if (Sprite_ctor) Sprite_ctor(container, 0); } catch (e) {}
    try {
        if (dropCtorAddr) {
            const ctor = new NativeFunction(dropCtorAddr, 'pointer', ['pointer', 'pointer']);
            ctor(container, clip);
        }
    } catch (e) {}
    const pos = {
        x: (Number(spec.x) || 0) + (Number(spec.offsetX) || 0),
        y: (Number(spec.y) || 0) + (Number(spec.offsetY) || 0),
    };
    const sY = Number(spec.scaleY !== undefined ? spec.scaleY :
              (spec.scale !== undefined ? spec.scale : 1));
    const sX = Number(spec.scaleX !== undefined ? spec.scaleX :
              (spec.scale !== undefined ? spec.scale : 1));
    const widget = {
        type: 'groupbg',
        ptr: container,
        show: function () {
            bringToFront(container);
            setVisible(container, true);
            setXYSafe(container, pos.x, pos.y);
            setInteractive(container, spec.visible === true);
            safeSetScale(container, sX, sY);
            safeSetScale(clip, sX, sY);
        },
        hide: function () { setVisible(container, false); },
        move: function (x, y) {
            pos.x = (Number(x) || 0) + (Number(spec.offsetX) || 0);
            pos.y = (Number(y) || 0) + (Number(spec.offsetY) || 0);
            setXYSafe(container, pos.x, pos.y);
        },
        setPosAbs: function (x, y) {
            pos.x = Number(x) || 0; pos.y = Number(y) || 0;
            setXYSafe(container, pos.x, pos.y);
        },
        setScale: function (sy, sx) {
            safeSetScale(container, Number(sx), Number(sy));
        },
        setFrame: function (f) {
            if (gotoAndStop) safeCall(gotoAndStop, clip, Number(f));
        },
    };
    widget.hide();
    return widget;
}
function createGroupWidget(spec) {
    const origin = { x: Number(spec.x) || 0, y: Number(spec.y) || 0 };
    const gapY   = Number(spec.gapY !== undefined ? spec.gapY : 8);
    let cursorY  = origin.y;
    const children = [];
    function make(childSpec, dx, dy) {
        if (dx === undefined) dx = 0;
        if (dy === undefined) dy = 0;
        const builder = WIDGET_BUILDERS[childSpec.type];
        if (!builder) return null;
        const cloned = Object.assign({}, childSpec);
        cloned.x = origin.x + (Number(childSpec.xOffset) || 0) + dx;
        cloned.y = origin.y + (Number(childSpec.yOffset) || 0) + dy;
        const w = builder(cloned);
        if (w) children.push({ w: w, spec: cloned });
        return w;
    }
    let bg = null;
    if (spec.bg) {
        const bgSpec = Object.assign({
            integer: 'tabbed_chat_event_negative',
            x: origin.x + (Number(spec.bg.x) || 0),
            y: origin.y + (Number(spec.bg.y) || 0),
        }, spec.bg);
        bg = createGroupBgWidget(bgSpec);
    }
    if (spec.title) {
        const tOffX = Number(spec.titleOffsetX) || 0;
        const tOffY = Number(spec.titleOffsetY) || 0;
        make({
            type: 'text',
            key: (spec.key || 'group') + '_title',
            text: spec.title,
            xOffset: tOffX,
            yOffset: tOffY,
            scale: spec.titleScale !== undefined ? spec.titleScale : 1,
        });
        cursorY += Number(spec.titleHeight) || 28;
    }
    if (Array.isArray(spec.items)) {
        spec.items.forEach(function (it) {
            make(it, Number(it.xOffset) || 0,
                 cursorY - origin.y + (Number(it.yOffset) || 0));
            if (!it.inline) cursorY += Number(it.gapAfter) || gapY;
        });
    }
    const api = {
        type: 'group',
        key: spec.key,
        children: children,
        items: children.map(function (c) { return c.spec; }),
        _children: children,
        show: function () {
            if (bg && bg.show) bg.show();
            children.forEach(function (c) { if (c.w && c.w.show) c.w.show(); });
            children.forEach(function (c) { if (c.w && bumpWidget) bumpWidget(c.w); });
        },
        hide: function () {
            children.forEach(function (c) { if (c.w && c.w.hide) c.w.hide(); });
            if (bg && bg.hide) bg.hide();
        },
        move: function (nx, ny) {
            const dx = (Number(nx) || 0) - origin.x;
            const dy = (Number(ny) || 0) - origin.y;
            if (bg && bg.move) bg.move(nx, ny);
            children.forEach(function (c) {
                if (c.w && c.w.move) c.w.move(c.spec.x + dx, c.spec.y + dy);
            });
        },
        find: function (key) {
            const c = children.find(function (ch) {
                return ch.spec && ch.spec.key === key;
            });
            return c ? c.w : null;
        },
        get: function (key) { return api.find(key); },
        set: function (p) {
            children.forEach(function (c) {
                if (c.w && c.w.handlePress) c.w.handlePress(p);
            });
        },
        setPosAbs: function (x, y) { if (bg && bg.setPosAbs) bg.setPosAbs(x, y); },
        setScale:  function (sy, sx) { if (bg && bg.setScale) bg.setScale(sy, sx); },
        setFrame:  function (f) { if (bg && bg.setFrame) bg.setFrame(f); },
    };
    api.hide();
    return api;
}
function createRedPopoverWidget(spec) {
    let clip = safeCall(StringTable_getMovieClip,
                        strPtr('sc/ui.sc'), strPtr('popover_button_red'));
    if (!isValidPtr(clip))
        clip = safeCall(StringTable_getMovieClip,
                        strPtr('sc/ui.sc'), strPtr('popover_button_announcer'));
    if (!isValidPtr(clip)) return null;
    const btn = newGameButtonFromClip(clip);
    if (!btn) return null;
    let textField = null;
    ['txt', 'Text', 'label', 'title_txt'].forEach(function (cand) {
        if (textField) return;
        const tf = safeCall(MovieClip_getTextFieldByName, clip, strPtr(cand));
        if (isValidPtr(tf)) textField = tf;
    });
    const text = scPtr(spec.text || 'Add to Quick Access');
    if (textField && MovieClipHelper_setTextAndScaleIfNecessary)
        safeCall(MovieClipHelper_setTextAndScaleIfNecessary, textField, text, 1, 1);
    try { if (GameButton_setText) GameButton_setText(btn, text, 1); } catch (e) {}
    const s = Number(spec.scale || 1);
    safeSetScale(btn, s, s);
    const widget = {
        type:    'redbutton',
        key:     spec.key,
        ptr:     btn,
        show:    function () { setVisible(btn, true);  setXYSafe(btn, spec.x, spec.y); bringToFront(btn); },
        hide:    function () { setVisible(btn, false); },
        move:    function (x, y) { setXYSafe(btn, Number(x), Number(y)); },
        setText: function (t) {
            const newText = scPtr(String(t));
            if (textField && MovieClipHelper_setTextAndScaleIfNecessary)
                safeCall(MovieClipHelper_setTextAndScaleIfNecessary, textField, newText, 1, 1);
            try { if (GameButton_setText) GameButton_setText(btn, newText, 1); } catch (e) {}
        },
        handlePress: function (p) {
            if (isValidPtr(btn) && p && p.equals && p.equals(btn)) {
                if (spec.quickAccessId) {
                    quickAccessUi.pendingTargetId = spec.quickAccessId;
                    _quickAccessOpen(spec.quickAccessId);
                }
                safeCall(spec.onPress, spec);
            }
        },
    };
    widget.hide();
    return widget;
}
function createQuickAccessButtonWidget(spec) {
    const clip = safeCall(StringTable_getMovieClip,
                          strPtr('sc/ui.sc'), strPtr('map_editor_exit_button'));
    if (!isValidPtr(clip)) return null;
    const btn = newGameButtonFromClip(clip);
    if (!btn) return null;
    let textField = null;
    ['txt', 'Text', 'label', 'title_txt'].forEach(function (cand) {
        if (textField) return;
        const tf = safeCall(MovieClip_getTextFieldByName, clip, strPtr(cand));
        if (isValidPtr(tf)) textField = tf;
    });
    const pos = { x: Number(spec.x || 0), y: Number(spec.y || 0) };
    const scale = Number(spec.scale || 1);
    const openLabel = spec.variant === 'open' ? 'Quick Access' : 'Quick Access';
    function setLabel(label, active, pending) {
        if (!textField) return;
        if (pending) {
            _quickAccessGradientLabel(textField, label);
        } else {
            _quickAccessColorize(textField, label, !!active, false);
        }
        try {
            if (MovieClipHelper_setTextAndScaleIfNecessary)
                MovieClipHelper_setTextAndScaleIfNecessary(textField, scPtr(String(label)), 1, 1);
        } catch (e) {}
        try { if (GameButton_setText) GameButton_setText(btn, scPtr(String(label)), 1); } catch (e) {}
    }
    setLabel(spec.text || openLabel, !!spec.active, !!spec.pending);
    safeSetScale(btn, scale, scale);
    const widget = {
        type:    'quickaccessbutton',
        key:     spec.key,
        ptr:     btn,
        x:       pos.x,
        show:    function () { bringToFront(btn); setVisible(btn, true); setXYSafe(btn, pos.x, pos.y); },
        hide:    function () { setVisible(btn, false); },
        move:    function (x, y) { pos.x = Number(x); pos.y = Number(y); setXYSafe(btn, pos.x, pos.y); },
        setLabel: setLabel,
        handlePress: function (p) {
            if (isValidPtr(btn) && p && p.equals && p.equals(btn))
                safeCall(spec.onPress, spec);
        },
    };
    widget.hide();
    return widget;
}
function createQuickAccessOverlay(spec) {
    spec = spec || {};
    const slotCount = Number(spec.slots || 6);
    const baseX     = Number(spec.x || 0);
    const baseY     = Number(spec.y != null ? spec.y : QUICK_ACCESS_TOP_Y);
    const toggleBtn = createQuickAccessButtonWidget({
        key:     'qaToggle',
        text:    'Quick Access',
        variant: 'open',
        x:       baseX,
        y:       baseY,
        scale:   spec.scale || 1,
        onPress: function () { _quickAccessToggle(); },
    });
    if (toggleBtn) {
        toggleBtn.x = baseX;
        quickAccessUi.toggleBtnWidget = toggleBtn;
    }
    const slotBtns = [];
    const slotWidgets = [];
    for (let i = 0; i < slotCount; i++) {
        const idx = i;
        const slotBtn = createQuickAccessButtonWidget({
            key:    'qaSlot' + idx,
            text:   '+',
            x:      baseX,
            y:      baseY + QUICK_ACCESS_SLOT_STEP * (idx + 1),
            scale:  spec.scale || 1,
            onPress: function () {
                if (quickAccessUi.pendingTargetId) {
                    _quickAccessSetSlot(idx, quickAccessUi.pendingTargetId);
                    quickAccessUi.pendingTargetId = null;
                    _quickAccessRefresh();
                    return;
                }
                const slot = quickAccessSlots.slotData[idx];
                if (!slot || !slot.targetId) return;
                const target = _quickAccessResolveTarget(slot.targetId);
                if (!target) return;
                if (target.widget && target.widget.toggle) target.widget.toggle();
                else if (target.widget && target.widget.onPress) safeCall(target.widget.onPress);
                _quickAccessRefresh();
            },
        });
        if (slotBtn) {
            slotBtn.x = baseX;
            if (idx < quickAccessSlots.slotData.length)
                quickAccessSlots.slotData[idx].button = slotBtn;
        }
        slotBtns.push(slotBtn);
        slotWidgets.push(null);
    }
    quickAccessUi.slotBtns      = slotBtns;
    quickAccessUi.slotWidgets   = slotWidgets;
    quickAccessUi.created       = true;
    quickAccessUi.isOpen        = false;
    quickAccessUi.slotsVisible  = true;
    quickAccessSlots.slotBtns   = slotBtns;
    _quickAccessShowHide(quickAccessUi.enabled);
    _quickAccessRefresh();
    return {
        type:      'qaoverlay',
        toggleBtn: toggleBtn,
        slotBtns:  slotBtns,
        ptr:       toggleBtn ? toggleBtn.ptr : NULL,
        show:    function () { _quickAccessShowHide(true); },
        hide:    function () { _quickAccessShowHide(false); },
        refresh: function () { _quickAccessRefresh(); },
        handlePress: function (p) {
            if (toggleBtn && toggleBtn.handlePress) toggleBtn.handlePress(p);
            for (let i = 0; i < slotBtns.length; i++) {
                if (slotBtns[i] && slotBtns[i].handlePress) slotBtns[i].handlePress(p);
            }
        },
    };
}
function _createStripPopup(key, overrides) {
    const cfg = Object.assign({}, CONFIG_UI_POPUPS[key], overrides || {});
    const px        = Number(cfg.x || 0);
    const py        = Number(cfg.y || 0);
    const scaleY    = Number(cfg.scaleY || cfg.scale || 1);
    const scaleX    = Number(cfg.scaleX || cfg.scale || 1);
    const tabsOX    = Number(cfg.tabsOffsetX || 0);
    const tabsOY    = Number(cfg.tabsOffsetY || 0);
    const contentOX = Number(cfg.contentOffsetX || 0);
    const contentOY = Number(cfg.contentOffsetY || 0);
    const headerOX  = Number(cfg.headerOffsetX || 0);
    const headerOY  = Number(cfg.headerOffsetY || 0);
    const closeOX   = Number(cfg.closeOffsetX || 0);
    const closeOY   = Number(cfg.closeOffsetY || 0);
    const bg = safeCall(StringTable_getMovieClip,
                        strPtr('sc/ui.sc'), strPtr('tabbed_chat_event_negative'));
    if (!isValidPtr(bg)) return null;
    safeSetScale(bg, scaleX, scaleY);
    setXYSafe(bg, px, py);
    const header = safeCall(StringTable_getMovieClip,
                            strPtr('sc/ui.sc'), strPtr('popup_news_tabs'));
    const hx = px + headerOX;
    const hy = py + headerOY;
    if (isValidPtr(header)) {
        setXYSafe(header, hx, hy);
        safeSetScale(header, scaleX, scaleY);
    }
    const titleStr = String(cfg.title || '');
    const candidateNames = ['title_txt', 'txt', 'label', 'text_txt'];
    let tfTitle = null;
    for (let i = 0; i < candidateNames.length; i++) {
        const tf = safeCall(MovieClip_getTextFieldByName, header, strPtr(candidateNames[i]));
        if (isValidPtr(tf)) { tfTitle = tf; break; }
    }
    if (!tfTitle) tfTitle = _findTextFieldAnywhere(header, candidateNames);
    if (isValidPtr(tfTitle) && titleStr) {
        try { if (movieClip_setText) movieClip_setText(tfTitle, scPtr(titleStr), NULL); } catch (e) {}
        const sy = Number(cfg.titleScaleY || cfg.titleScale || 1);
        const sx = Number(cfg.titleScaleX || cfg.titleScale || 1);
        try {
            if (MovieClipHelper_setTextAndScaleIfNecessary)
                MovieClipHelper_setTextAndScaleIfNecessary(tfTitle, scPtr(titleStr), sy, sx);
        } catch (e) {}
    }
    const closeClip = safeCall(MovieClip_getChildByName, bg, strPtr('close'));
    let closeBtn = null;
    if (isValidPtr(closeClip)) {
        if (gotoAndStop) safeCall(gotoAndStop, closeClip, 1);
        safeSetScale(closeClip, CLOSE_BUTTON_SCALE, CLOSE_BUTTON_SCALE);
        setXYSafe(closeClip, px + closeOX, py + closeOY);
        closeBtn = newGameButtonFromClip(closeClip);
        if (closeBtn) {
            setInteractive(closeClip, true);
            bringToFront(closeClip);
        }
    }
    const tabs = cfg.tabs || [];
    const tabsRow = [];
    const childrenByTab = {};
    const allChildren   = [];
    const basePos = { x: px, y: py };
    let tabsX = hx + tabsOX;
    const tabsY = hy + tabsOY;
    const spacing = Number(cfg.tabsSpacing || 143);
    for (let i = 0; i < tabs.length; i++) {
        const tabName = tabs[i];
        const tabClip = safeCall(StringTable_getMovieClip,
                                 strPtr('sc/ui.sc'), strPtr('popup_news_tabs'));
        if (isValidPtr(tabClip)) {
            setXYSafe(tabClip, tabsX, tabsY);
            safeSetScale(tabClip, scaleX, scaleY);
            const btn = newGameButtonFromClip(tabClip);
            tabsRow.push({ name: tabName, clip: tabClip, btn: btn });
            tabsX += spacing;
        }
    }
    function makeItemsForTab(tabName) {
        const list = (cfg.itemsByTab && cfg.itemsByTab[tabName]) || [];
        const built = [];
        for (let j = 0; j < list.length; j++) {
            const itemSpec = buildPopupChildSpec(list[j], px, py, contentOX, contentOY);
            const builder  = WIDGET_BUILDERS[itemSpec.type];
            if (!builder) continue;
            const w = builder(itemSpec);
            if (w) {
                built.push({ w: w, spec: itemSpec });
                allChildren.push({ w: w, spec: itemSpec });
            }
        }
        childrenByTab[tabName] = built;
        return built;
    }
    for (let i = 0; i < tabs.length; i++) makeItemsForTab(tabs[i]);
    const popupObj = {
        type:    'popup',
        key:     key,
        cfg:     cfg,
        bg:      bg,
        header:  header,
        closeBtn: closeBtn,
        tabsRow: tabsRow,
        childrenByTab: childrenByTab,
        allChildren: allChildren,
        basePos: basePos,
        activeTab: cfg.defaultTab,
        makeItemsForTab: makeItemsForTab,
        show: function () {
            if (isValidPtr(bg)) { setVisible(bg, true); bringToFront(bg); }
            if (isValidPtr(header)) { setVisible(header, true); bringToFront(header); }
            const tab = popupObj.activeTab || (cfg.tabs && cfg.tabs[0]);
            const list = childrenByTab[tab] || [];
            list.forEach(function (c) { if (c.w && c.w.show) c.w.show(); });
        },
        hide: function () {
            if (isValidPtr(bg)) setVisible(bg, false);
            if (isValidPtr(header)) setVisible(header, false);
            allChildren.forEach(function (c) { if (c.w && c.w.hide) c.w.hide(); });
        },
    };
    return popupObj;
}
createStripPopup = _createStripPopup;
function autododgeMenu() {
    if (currentPopup && lastShownPopupKey === 'AutoDodge') {
        if (currentPopup.show) currentPopup.show();
        return currentPopup;
    }
    UIPopup.show('AutoDodge');
    return currentPopup;
}
function _hideAutododgeIfOpen() {
    if (currentPopup && lastShownPopupKey === 'AutoDodge') UIPopup.hide();
}
hideAutododgeIfOpen = _hideAutododgeIfOpen;
function _initWidgetBuilders() {
    WIDGET_BUILDERS = {
        button:        function (spec) { return createButtonWidget(spec); },
        bluebutton:    function (spec) { return createBlueButtonWidget(spec); },
        redbutton:     function (spec) { return createRedPopoverWidget(spec); },
        text:          function (spec) { return _createTextWidget(spec); },
        input:         function (spec) { return createInputWidget(spec); },
        slider:        function (spec) { return createSliderWidget(spec); },
        toggle:        function (spec) { return createToggleWidget(spec); },
        lockradio:     function (spec) { return createLockRadioWidget(spec); },
        group:         function (spec) { return createGroupWidget(spec); },
        groupbg:       function (spec) { return createGroupBgWidget(spec); },
        quickaccess:   function (spec) { return createQuickAccessButtonWidget(spec); },
        quickoverlay:  function (spec) { return createQuickAccessOverlay(spec); },
    };
}
function _initUIPopup() {
    UIPopup = {
        active: null,
        pendingTargetId: null,
        show: function (key) {
            if (!CONFIG_UI_POPUPS) return;
            const cfg = CONFIG_UI_POPUPS[key];
            if (!cfg) return;
            if (currentPopup) { try { UIPopup.hide(); } catch (e) {} }
            currentPopup = _createStripPopup(key, null);
            lastShownPopupKey = key;
            if (currentPopup && currentPopup.show) currentPopup.show();
        },
        hide: function () {
            if (!currentPopup) return;
            if (currentPopup.hide) currentPopup.hide();
            currentPopup = null;
            lastShownPopupKey = null;
        },
        find: function (k) {
            if (!currentPopup) return null;
            const allChildren = currentPopup.allChildren || [];
            for (let i = 0; i < allChildren.length; i++) {
                if (allChildren[i].spec && allChildren[i].spec.key === k)
                    return allChildren[i].w;
            }
            return null;
        },
        set: function (key, txt) {
            const w = this.find(key);
            if (w && typeof w.setText === 'function') w.setText(txt);
        },
        setContentOffset: function () {},
        setTitleScale:    function () {},
        _buildTabsRow:    function () {},
    };
}
function _initMenuLayout() {
    MENU_LAYOUT = {};
    MENU_LAYOUT.quickAccessMaster = {
        type:        'toggle',
        key:         'quickAccessMaster',
        title:       'Quick Access',
        yOffset:     130,
        onLabel:     'ON',
        offLabel:    'OFF',
        initial:     true,
        onToggle:    function (v) { quickAccessUi.enabled = !!v; _quickAccessShowHide(!!v); },
    };
    MENU_LAYOUT.modInfo = {
        type:  'group', tab:   'Home', key:   'modInfo', title: 'Information :',
        items: [
            { type: 'text', text: 'Welcome to Null Rythm v1.1 !' },
            { type: 'text', text: '   Developed by Ryo & Maximosso' },
            { type: 'text', text: '         This experimental build showcases' },
            { type: 'text', text: '         New UI elements and fun features.' },
            { type: 'text', text: '     Enjoy special modded gameplay.' },
            { type: 'text', text: '     Feedback is (very) appreciated !' },
            { type: 'text', text: '[BETA] Null Rythm', badge: true },
        ],
    };
    MENU_LAYOUT.modNews = {
        type:  'group', tab:   'Home', key:   'modNews', title: 'News :', x: 170,
        items: [
            { type: 'text', text: '[BETA] KillAura Rework!' },
            { type: 'text', text: '[BETA] New spin hack' },
            { type: 'text', text: '[BETA] New tabs Icons' },
            { type: 'text', text: '[BETA] Fixed dodge bug' },
            { type: 'text', text: '[BETA] Precision changer' },
            { type: 'text', text: '[BETA] Fully Fixed android' },
            { type: 'text', text: '[BETA] Fixed dyna-jump' },
            { type: 'text', text: '[BETA] Menu redesign' },
            { type: 'text', text: '[BETA] Aimbot added' },
            { type: 'text', text: '[BETA] NullR released' },
        ],
    };
    MENU_LAYOUT.settingsColor = {
        type: 'button', tab: 'Home', key: 'settingsColor',
        text: 'Settings Color', x: 290, y: 475,
        onPress: FN_27_settingsColor_onPress,
    };
    MENU_LAYOUT.settingsSize = {
        type: 'button', tab: 'Home', key: 'settingsSize',
        text: 'Settings Size', x: 460, y: 475,
        onPress: FN_28_settingsSize_onPress,
    };
    MENU_LAYOUT.settingsDistribution = {
        type: 'button', tab: 'Home', key: 'settingsDistribution',
        text: 'Settings Distribution', x: 632, y: 475,
        onPress: FN_29_settingsDistribution_onPress,
    };
    MENU_LAYOUT.dodgeGroup = {
        type: 'group', tab: 'Cheats', key: 'dodgeGroup', title: 'Dodge',
        items: [
            { type: 'toggle', key: 'dodgeToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'dodge', quickAccessLabel: 'Dodge',
              onToggle: FN_30_dodge_onToggle },
            { type: 'bluebutton', key: 'dodgeMenuButton',
              text: 'Settings', xOffset: 354, yOffset: 185,
              onPress: FN_31_dodge_openMenu_onPress },
            { type: 'redbutton', key: 'quickAccessDodge',
              text: 'Add to Quick Access', quickAccessId: 'dodge',
              onPress: FN_32_dodge_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.aimbotGroup = {
        type: 'group', tab: 'Cheats', key: 'aimbotGroup', title: 'Aimbot',
        items: [
            { type: 'toggle', key: 'aimbotToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'aimbot', quickAccessLabel: 'Aimbot',
              onToggle: FN_33_aimbot_onToggle },
            { type: 'text', key: 'aimPrecLabel', text: 'Log Position: 5' },
            { type: 'slider', key: 'aimPrecSlider',
              min: 1, max: 60, initial: 5,
              onChange: function (v) {
                  config.aimPrecision = v;
                  lastpositionsLen = v;
                  _setLabel('aimPrecLabel', 'Log Position: ' + v);
              } },
            { type: 'redbutton', key: 'aimQuickAccess',
              text: 'Add to Quick Access', quickAccessId: 'aimbot',
              onPress: FN_36_aimbot_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.killAuraGroup = {
        type: 'group', tab: 'Cheats', key: 'killAuraGroup', title: 'Kill Aura',
        items: [
            { type: 'toggle', key: 'killAuraToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'killAura', quickAccessLabel: 'Kill Aura',
              onToggle: FN_37_killAura_onToggle },
            { type: 'text', key: 'minHealthLabel', text: 'MinHealth: 0' },
            { type: 'slider', key: 'minHealthSlider',
              min: 0, max: 100, initial: 0,
              onChange: function (v) {
                  config.minHealth = v;
                  killAuraMinHealth = v;
                  if (Cheats.killAura) Cheats.killAura.minHealth = v;
                  _setLabel('minHealthLabel', 'MinHealth: ' + v);
                  killAuraMinHealth_renderLabel(v);
              } },
            { type: 'lockradio', key: 'useUlt', text: 'Use Ulti',
              onToggle: function (v) {
                  config.killAuraUseUlti = !!v;
                  killAuraUseUlti = !!v;
                  if (Cheats.killAura) Cheats.killAura.useUlt = !!v;
              } },
            { type: 'redbutton', key: 'killAuraQuickAccess',
              text: 'Add to Quick Access', quickAccessId: 'killAura',
              onPress: FN_41_killAura_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.holdToShootGroup = {
        type: 'group', tab: 'Cheats', key: 'holdToShootGroup', title: 'Hold to Shoot',
        items: [
            { type: 'toggle', key: 'holdToShootToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'holdToShoot', quickAccessLabel: 'Hold to Shoot',
              onToggle: FN_42_holdToShoot_onToggle },
            { type: 'text', key: 'h2sDelayLabel', text: 'Aim Wait: 50' },
            { type: 'slider', key: 'h2sDelaySlider',
              min: 0, max: 500, initial: 50,
              onChange: function (v) {
                  config.h2sDelay = v;
                  holdToShootFirstShotDelay = v;
                  _setLabel('h2sDelayLabel', 'Aim Wait: ' + v);
                  holdToShootFirstShotDelay_renderLabel(v);
              } },
            { type: 'lockradio', key: 'h2sAutoAim', text: 'Allow Aim',
              onToggle: function (v) { config.h2sAutoAim = !!v; holdToShootAim = !!v; } },
            { type: 'lockradio', key: 'h2sRangeCheck', text: 'Range Check',
              onToggle: function (v) { config.h2sRangeCheck = !!v; holdToShootRangeCheck = !!v; } },
            { type: 'redbutton', key: 'holdToShootQuickAccess',
              text: 'Add to Quick Access', quickAccessId: 'holdToShoot',
              onPress: FN_47_holdToShoot_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.autoFarmGroup = {
        type: 'group', tab: 'Cheats', key: 'autoFarmGroup', title: 'Autofarm',
        items: [
            { type: 'toggle', key: 'autoFarmToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'autoFarm', quickAccessLabel: 'Autofarm',
              onToggle: FN_48_autoFarm_onToggle },
            { type: 'redbutton', key: 'autoFarmQuickAccess',
              text: 'Add to Quick Access', quickAccessId: 'autoFarm',
              onPress: FN_49_autoFarm_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.dynajumpGrup = {
        type: 'group', tab: 'Misc', key: 'dynajumpGrup', title: 'Dynajump',
        items: [
            { type: 'bluebutton', key: 'dynajumpDo4',
              text: 'Do 4 jumps', quickAccessId: 'dynajump', quickAccessLabel: 'Dynajump',
              onPress: FN_50_dynajump_do4Jumps_onPress },
            { type: 'text', key: 'spamLabel', text: 'Spam: 700' },
            { type: 'slider', key: 'spamSlider',
              min: 100, max: 2000, initial: 700,
              onChange: function (v) {
                  config.spamWindowMs = v;
                  SPAM_WINDOW_MS = v;
                  if (Cheats.dynajump) Cheats.dynajump.spamWindow = v;
                  _setLabel('spamLabel', 'Spam: ' + v);
                  SPAM_WINDOW_MS_renderLabel(v);
              } },
            { type: 'redbutton', key: 'dynajumpQuickAccess',
              text: 'Add Dynajump', quickAccessId: 'dynajump',
              onPress: FN_53_dynajump_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.colorGroup = {
        type: 'group', tab: 'Visual', key: 'colorGroup', title: 'Change Color',
        items: [
            { type: 'toggle', key: 'colorToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              onToggle: FN_54_colorToggle_onToggle },
            { type: 'text', key: 'precLabel', text: 'Color: 60' },
            { type: 'slider', key: 'precSlider',
              min: 0, max: 255, initial: 60,
              onChange: function (v) {
                  config.precision = v;
                  _setLabel('precLabel', 'Color: ' + v);
                  colorPicker_renderLabel(v);
              } },
            { type: 'lockradio', key: 'opt1', text: 'Joystick',
              onToggle: FN_57_colorJoystick_onChange },
            { type: 'redbutton', key: 'quickAccessColor',
              text: 'Add to Quick Access', quickAccessId: 'color',
              onPress: FN_58_colorQuickAccess_noop },
        ],
    };
    MENU_LAYOUT.cameraGroup = {
        type: 'group', tab: 'Visual', key: 'cameraGroup', title: 'Camera',
        items: [
            { type: 'toggle', key: 'cameraToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'camera', quickAccessLabel: 'Camera',
              onToggle: FN_59_camera_onToggle },
            { type: 'redbutton', key: 'QuickAccessCamera',
              text: 'Add to Quick Access', quickAccessId: 'camera',
              onPress: FN_60_camera_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.spinGroup = {
        type: 'group', tab: 'Misc', key: 'spinGroup', title: 'Auto-Spin',
        items: [
            { type: 'toggle', key: 'spinToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'spin', quickAccessLabel: 'Auto-Spin',
              onToggle: FN_61_spin_onToggle },
            { type: 'text', key: 'precLabelSpin', text: 'Speed: 40' },
            { type: 'slider', key: 'precSliderSpin',
              min: 1, max: 100, initial: 40,
              onChange: function (v) {
                  config.spinSpeed = v;
                  spinSpeed = v;
                  _setLabel('precLabelSpin', 'Speed: ' + v);
                  spinSpeed_renderLabel(v);
              } },
            { type: 'lockradio', key: 'useUltSpin', text: 'Allow on Move',
              onToggle: FN_64_autoSpinAllowMoving_onChange },
            { type: 'redbutton', key: 'quickAccessSpin',
              text: 'Add to Quick Access', quickAccessId: 'spin',
              onPress: FN_65_spin_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.fpsCounter = {
        type: 'group', tab: 'Misc', key: 'fpsCounter', title: 'FPS Counter',
        items: [
            { type: 'toggle', key: 'fpsCounterToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'fps', quickAccessLabel: 'FPS Counter',
              onToggle: FN_66_fps_onToggle },
            { type: 'redbutton', key: 'aimQuickAccessFps',
              text: 'Add to Quick Access', quickAccessId: 'fps',
              onPress: FN_67_fps_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.pinGroup = {
        type: 'group', tab: 'Misc', key: 'pinGroup', title: 'Spam Empty-Pin',
        items: [
            { type: 'toggle', key: 'pinCounterToggle',
              onLabel: 'ON', offLabel: 'OFF', initial: false,
              quickAccessId: 'pin', quickAccessLabel: 'Spam Empty-Pin',
              onToggle: FN_68_pin_onToggle },
            { type: 'redbutton', key: 'aimQuickAccessPin',
              text: 'Add to Quick Access', quickAccessId: 'pin',
              onPress: FN_69_pin_quickAccess_onPress },
        ],
    };
    MENU_LAYOUT.spectateByTagGroup = {
        type: 'group', tab: 'Misc', key: 'spectateByTagGroup', title: 'Spectate By Tag',
        items: [
            { type: 'input', key: 'spectateTagInput', maxLen: 16 },
            { type: 'bluebutton', key: 'spectateSendButton', text: 'Send',
              onPress: FN_70_spectateSend_onPress },
            { type: 'lockradio', key: 'spectateBrawlTv', text: 'BrawlTV',
              title: 'Spectate',
              onToggle: FN_71_spectateBrawlTv_onChange },
            { type: 'redbutton', key: 'spectateQuickAccess',
              text: 'Add Spectate', quickAccessId: 'spectate',
              onPress: FN_72_spectate_quickAccess_onPress },
        ],
    };
}
function _initConfigPopups() {
    CONFIG_UI_POPUPS = {};
    CONFIG_UI_POPUPS.settingsColor = {
        mode: 'tabbed', title: 'Settings - Color', x: 580, y: 350,
        defaultTab: 'Background',
        tabs: ['Background', 'Text'],
        itemsByTab: {
            Background: [
                { type: 'text',   key: 'lblRed',   text: 'Red: 50' },
                { type: 'slider', key: 'sldRed',   min: 0, max: 255, initial: 50, gradient: 'Red',   onChange: FN_75_bgRed_onChange },
                { type: 'text',   key: 'lblGreen', text: 'Green: 50' },
                { type: 'slider', key: 'sldGreen', min: 0, max: 255, initial: 50, gradient: 'Green', onChange: FN_76_bgGreen_onChange },
                { type: 'text',   key: 'lblBlue',  text: 'Blue: 50' },
                { type: 'slider', key: 'sldBlue',  min: 0, max: 255, initial: 50, gradient: 'Blue',  onChange: FN_77_bgBlue_onChange },
            ],
            Text: [
                { type: 'text',   key: 't_lblRed',   text: 'Red: 50' },
                { type: 'slider', key: 't_sldRed',   min: 0, max: 255, initial: 50, gradient: 'Red',   onChange: FN_78_textRed_onChange },
                { type: 'text',   key: 't_lblGreen', text: 'Green: 50' },
                { type: 'slider', key: 't_sldGreen', min: 0, max: 255, initial: 50, gradient: 'Green', onChange: FN_79_textGreen_onChange },
                { type: 'text',   key: 't_lblBlue',  text: 'Blue: 50' },
                { type: 'slider', key: 't_sldBlue',  min: 0, max: 255, initial: 50, gradient: 'Blue',  onChange: FN_80_textBlue_onChange },
            ],
        },
    };
    CONFIG_UI_POPUPS.settingsSize = {
        mode: 'tabbed', title: 'Settings - Size', x: 580, y: 350,
        defaultTab: 'Main', tabs: ['Main'],
        itemsByTab: {
            Main: [
                { type: 'text', key: 'sizeInfo', text: 'Choose UI size:\nSmall - Normal - Large' },
            ],
        },
    };
    CONFIG_UI_POPUPS.settingsDistribution = {
        mode: 'tabbed', title: 'Settings - Distribution', x: 580, y: 400,
        defaultTab: 'Tabs Distribution',
        tabs: ['Tabs Distribution', 'Modules'],
        itemsByTab: {
            'Tabs Distribution': [
                { type: 'text', key: 'distInfo',
                  text: 'Configure distribution rules.\nDrag and drop or use presets.' },
            ],
            'Modules': [
                { type: 'text', key: 'modsInfo', text: 'Modules (WIP)' },
            ],
        },
    };
    CONFIG_UI_POPUPS.AutoDodge = {
        mode: 'tabbed', title: 'AutoDodge', x: 580, y: 350,
        defaultTab: 'Main', tabs: ['Main', 'Ignore'],
        tabsOffsetX: 0, tabsOffsetY: 0, tabsSpacing: 110, contentOffsetY: 0,
        itemsByTab: {
            Main: [
                { type: 'text',   key: 'ad_precLabel',   text: 'Precision: 3.75' },
                { type: 'slider', key: 'ad_precSlider',
                  min: 1, max: 100, initial: Math.round(DodgeConfig.precision * 16),
                  onChange: function (v) {
                      DodgeConfig.precision = v / 16;
                      _setLabel('ad_precLabel', 'Precision: ' + DodgeConfig.precision.toFixed(2));
                  } },
                { type: 'text',   key: 'ad_marginLabel', text: 'Safety Margin: 60' },
                { type: 'slider', key: 'ad_marginSlider',
                  min: 0, max: 200, initial: config.safetyMargin,
                  onChange: function (v) {
                      config.safetyMargin = v;
                      _setLabel('ad_marginLabel', 'Safety Margin: ' + v);
                  } },
                { type: 'text',   key: 'ad_lookupLabel', text: 'SafeWalk Lookup: 300' },
                { type: 'slider', key: 'ad_lookupSlider',
                  min: 50, max: 1000, initial: config.safeWalkLookup,
                  onChange: function (v) {
                      config.safeWalkLookup = v;
                      _setLabel('ad_lookupLabel', 'SafeWalk Lookup: ' + v);
                  } },
            ],
            Ignore: [
                { type: 'text',   key: 'ad_ignoreRangeLabel',  text: 'Min Range: 10' },
                { type: 'slider', key: 'ad_ignoreRangeSlider',
                  min: 0, max: 100, initial: config.ignoreMinRange,
                  onChange: function (v) {
                      config.ignoreMinRange = v;
                      AUTO_DODGE_MIN_RANGE = v;
                      _setLabel('ad_ignoreRangeLabel', 'Min Range: ' + v);
                  } },
                { type: 'text',   key: 'ad_ignoreSpreadLabel', text: 'Max Spread: 100' },
                { type: 'slider', key: 'ad_ignoreSpreadSlider',
                  min: 0, max: 500, initial: config.ignoreMaxSpread,
                  onChange: function (v) {
                      config.ignoreMaxSpread = v;
                      AUTO_DODGE_MAX_SPREAD = v;
                      _setLabel('ad_ignoreSpreadLabel', 'Max Spread: ' + v);
                  } },
                { type: 'lockradio', key: 'ad_ignoreThrowers', text: 'Ignore Throwers',
                  textOffsetX: -260, textOffsetY: -290,
                  onToggle: function (v) { config.ignoreThrowers = !!v; } },
            ],
        },
    };
}
let vtablePatched = false;
function patchSpectatePopupVTable() {
    if (vtablePatched) return null;
    vtablePatched = true;
    try {
        if (!SpectatePopupVTable) return null;
        const vt = ptr(SpectatePopupVTable);
        const PS = Process.pointerSize;
        const origs = [];
        for (let i = 0; i < 5; i++) origs.push(vt.add(i * PS).readPointer());
        return origs;
    } catch (e) { return null; }
}
function initializeButtonInterceptor() {
    if (!isValidPtr(CustomButton_buttonPressed)) return;
    try {
        Interceptor.attach(CustomButton_buttonPressed, {
            onEnter: function (args) {
                const buttonPtr = args[0];
                if (!isValidPtr(buttonPtr)) return;
                for (const tabName in tabMenuObjects) {
                    const tab = tabMenuObjects[tabName];
                    if (!tab || !tab.groups) continue;
                    for (const grpKey in tab.groups) {
                        const grp = tab.groups[grpKey];
                        if (grp && grp.set) {
                            try { grp.set(buttonPtr); } catch (e) {}
                        }
                    }
                }
                if (quickAccessUi.toggleBtnWidget && quickAccessUi.toggleBtnWidget.handlePress)
                    quickAccessUi.toggleBtnWidget.handlePress(buttonPtr);
                const slotBtns = quickAccessUi.slotBtns || [];
                for (let i = 0; i < slotBtns.length; i++) {
                    const sb = slotBtns[i];
                    if (sb && sb.handlePress) sb.handlePress(buttonPtr);
                }
            },
        });
    } catch (e) {}
}
function initializeGameLoopHook() {
    if (!isValidPtr(GameMain_update_a)) return;
    if (!FPS_FRAME_STATE) {
        FPS_FRAME_STATE = {
            samples:    [],
            listener:   null,
            lastEmit:   Date.now(),
            tick: function () {
                const now = Date.now();
                this.samples.push(now);
                while (this.samples.length && (now - this.samples[0]) > 1000) {
                    this.samples.shift();
                }
                if ((now - this.lastEmit) >= 250 && this.listener) {
                    this.lastEmit = now;
                    try { this.listener(this.samples.length | 0); } catch (e) {}
                }
            },
        };
    }
    try {
        Interceptor.attach(GameMain_update_a, {
            onEnter: function () {
                for (let i = 0; i < perFrameCallbacks.length; i++) {
                    try { perFrameCallbacks[i](); } catch (e) {}
                }
                for (let i = 0; i < activeSliders.length; i++) {
                    const s = activeSliders[i];
                    if (s && s.pump) try { s.pump(); } catch (e) {}
                }
                if (state.aimbot) lastPositionsSampler();
                FPS_FRAME_STATE.tick();
            },
        });
    } catch (e) {}
}
function installUpdateMovementDispatcher(base) {
    let updateMovementAddr;
    try {
        updateMovementAddr = base.add(OFFSETS.BattleScreen_updateMovement);
    } catch (e) { return; }
    if (updateMovementHooked) return;
    updateMovementHooked = true;
    try {
        Interceptor.attach(updateMovementAddr, {
            onEnter: function (args) {
                const battleScreen = args[0];
                if (!isValidPtr(battleScreen)) return;
                let attackHeld = 0, ultiHeld = 0;
                try {
                    attackHeld = battleScreen.add(OFFSETS.AttackHeld_byteOffset).readU8();
                    ultiHeld   = battleScreen.add(OFFSETS.UltiHeld_byteOffset).readU8();
                } catch (e) {}
                for (let i = 0; i < updateMovementHandlers.length; i++) {
                    try { updateMovementHandlers[i](battleScreen, attackHeld, ultiHeld); }
                    catch (e) {}
                }
            },
        });
    } catch (e) {}
}
function onLibgLoaded(_baseArg) {
    const base = _baseArg || getAdjustedBase('libg.so');
    if (!base) { try { console.warn('[NullRythm] libg.so missing'); } catch (e) {} return; }
    libgBase = base;
    try {
        malloc = new NativeFunction(
            Module.getExportByName('libc.so', 'malloc'),
            'pointer', ['uint']);
        memset = new NativeFunction(
            Module.getExportByName('libc.so', 'memset'),
            'pointer', ['pointer', 'int', 'ulong']);
    } catch (e) {
        try { console.warn('[NullRythm] libc bind failed: ' + e); } catch (_) {}
        return;
    }
    function bindFn(rva, ret, args) {
        try { return new NativeFunction(base.add(rva), ret, args); }
        catch (e) { return null; }
    }
    function bindAddr(rva) {
        try { return base.add(rva); } catch (e) { return null; }
    }
    DisplayObject_setXY = bindFn(OFFSETS.DisplayObject_setXY, 'void', ['pointer', 'float', 'float']);
    DisplayObject_setPixelSnappedXY = bindFn(OFFSETS.DisplayObject_setPixelSnappedXY, 'void', ['pointer', 'float', 'float']);
    DisplayObject_removeFromParent = bindFn(OFFSETS.DisplayObject_removeFromParent, 'void', ['pointer']);
    MovieClipHelper_setTextAndScaleIfNecessary = bindFn(OFFSETS.MovieClipHelper_setTextAndScaleIfNecessary, 'void', ['pointer', 'pointer', 'int', 'int']);
    MovieClip_getTextFieldByName = bindFn(OFFSETS.MovieClip_getTextFieldByName, 'pointer', ['pointer', 'pointer']);
    MovieClip_getChildByName = bindFn(OFFSETS.MovieClip_getChildByName, 'pointer', ['pointer', 'pointer']);
    movieClip_setText = bindFn(OFFSETS.movieClip_setText, 'void', ['pointer', 'pointer', 'pointer']);
    StringTable_getMovieClip = bindFn(OFFSETS.StringTable_getMovieClip, 'pointer', ['pointer', 'pointer']);
    gotoAndStop = bindFn(OFFSETS.gotoAndStop, 'void', ['pointer', 'int']);
    GameButton_setText = bindFn(OFFSETS.GameButton_setText, 'int64', ['pointer', 'pointer', 'char']);
    GameButton_ctor = bindAddr(OFFSETS.GameButton_ctor);
    CustomButton_buttonPressed = bindAddr(OFFSETS.CustomButton_buttonPressed);
    dropGUIContainer_addGameButton = bindFn(OFFSETS.dropGUIContainer_addGameButton, 'pointer', ['pointer', 'pointer', 'int']);
    dropCtorAddr = bindAddr(OFFSETS.dropCtor);
    Stage_addChild = bindFn(OFFSETS.Stage_addChild, 'pointer', ['pointer', 'pointer']);
    Sprite_addChild = Stage_addChild;
    Sprite_ctor = bindFn(OFFSETS.Sprite_ctor, 'pointer', ['pointer', 'uint16']);
    stringCtor = bindFn(OFFSETS.stringCtor, 'pointer', ['pointer', 'pointer']);
    setInteractiveRecursive = bindFn(OFFSETS.setInteractiveRecursive, 'void', ['pointer', 'int']);
    DecoratedTextField_setupDecoratedText = bindFn(OFFSETS.DecoratedTextField_setupDecoratedText, 'void', ['pointer', 'pointer', 'pointer']);
    LogicDataTables_getColorGradientByName = bindFn(OFFSETS.LogicDataTables_getColorGradientByName, 'pointer', ['pointer', 'int']);
    GameSliderComponent_ctor = bindFn(OFFSETS.GameSliderComponent_ctor, 'void', ['pointer', 'pointer', 'pointer', 'int', 'int']);
    GameSliderComponent_setBounds = bindFn(OFFSETS.GameSliderComponent_setBounds, 'void', ['pointer', 'int', 'int']);
    GameSlider_refreshLogic = bindFn(OFFSETS.GameSlider_refreshLogic, 'void', ['pointer']);
    GameSlider_update = bindFn(OFFSETS.GameSlider_update, 'void', ['pointer']);
    GenericPopup_GenericPopup = bindFn(OFFSETS.GenericPopup_GenericPopup, 'pointer',
        ['pointer', 'pointer', 'char', 'char', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']);
    GenericPopup_addPopupButton = bindFn(OFFSETS.GenericPopup_addPopupButton, 'pointer', ['pointer', 'pointer', 'pointer', 'int']);
    GameInputField_GameInputField = bindFn(OFFSETS.GameInputField_GameInputField, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']);
    GameInputField_setMaxTextLength = bindFn(OFFSETS.GameInputField_setMaxTextLength, 'pointer', ['pointer', 'pointer', 'int']);
    TextField_reset = bindFn(OFFSETS.TextField_reset, 'pointer', ['pointer', 'pointer']);
    operator_new = bindFn(OFFSETS.operator_new, 'pointer', ['ulong']);
    StartSpectateMessage_StartSpectateMessage = bindFn(OFFSETS.StartSpectateMessage_StartSpectateMessage, 'pointer',
        ['pointer', 'pointer', 'pointer', 'char']);
    GameMain_update_a = bindAddr(OFFSETS.GameMain_update_a);
    try { MessageManagerPtr = base.add(OFFSETS.MessageManagerPtr); } catch (e) {}
    try { SpectatePopupVTable = base.add(OFFSETS.SpectatePopupVTable).readPointer(); } catch (e) {}
    try {
        const stagePtrSlot = base.add(OFFSETS.stage_instance);
        STAGE_PTR = stagePtrSlot.readPointer();
    } catch (e) { STAGE_PTR = NULL; }
    state.natives = {
        base:                            base,
        LogicBattleModeClient_update:    bindAddr(OFFSETS.LogicBattleModeClient_update),
        LogicGameObjectClient_getX:      bindFn(OFFSETS.LogicGameObjectClient_getX, 'uint32', ['pointer']),
        LogicGameObjectClient_getY:      bindFn(OFFSETS.LogicGameObjectClient_getY, 'uint32', ['pointer']),
        LogicBattleModeClient_getOwnCharacter: bindFn(OFFSETS.LogicBattleModeClient_getOwnCharacter, 'pointer', ['pointer']),
        BattleScreen_getLogicBattleModeClient: bindFn(OFFSETS.BattleScreen_getLogicBattleModeClient, 'pointer', ['pointer']),
        BattleMode_getInstance:          bindFn(OFFSETS.BattleMode_getInstance, 'pointer', []),
        getX:                            bindFn(OFFSETS.LogicGameObjectClient_getX, 'uint32', ['pointer']),
        getY:                            bindFn(OFFSETS.LogicGameObjectClient_getY, 'uint32', ['pointer']),
    };
    state.natives.LogicGameObjectClient_getX = state.natives.getX;
    state.natives.LogicGameObjectClient_getY = state.natives.getY;
    try { state.engineCollisionScratch = Memory.alloc(0x4000); } catch (e) {}
    _initWidgetBuilders();
    _initMenuLayout();
    _initConfigPopups();
    _initUIPopup();
    if (typeof findTextFieldAnywhere === 'function') {}
    findTextFieldAnywhere = _findTextFieldAnywhere;
    patchSpectatePopupVTable();
    installDodge(false);
    installAutoSpin(base);
    const dyn = installDynajump(base);
    if (dyn) Cheats.dynajumpStart = dyn.start;
    installFps(base);
    const cam = installCamera(base);
    const pin = installPinSpam(base);
    const farm = installAutoFarmBridge();
    const spec = installSpectate();
    const qa   = installQuickAccess();
    installKillAura({ base: base }, base);
    installHoldToShoot({ base: base }, base);
    const _origCameraOnToggle = FN_59_camera_onToggle;
    FN_59_camera_onToggle = function (on) {
        _origCameraOnToggle(on);
        if (on) { if (cam && cam.attach) cam.attach(); }
        else    { if (cam && cam.detach) cam.detach(); }
    };
    const _origPinOnToggle = FN_68_pin_onToggle;
    FN_68_pin_onToggle = function (on) {
        _origPinOnToggle(on);
        if (pin && typeof pin.setPinMenuState === 'function') {
            pin.setPinMenuState(on);
        }
    };
    const _origFpsOnToggle = FN_66_fps_onToggle;
    FN_66_fps_onToggle = function (on) {
        const wasOn = fpsMenuState;
        _origFpsOnToggle(on);
        if (on && !wasOn) installFps(base);
    };
    initializeButtonInterceptor();
    initializeGameLoopHook();
    installUpdateMovementDispatcher(base);
    _ensureStageAddChildReady(function () {
        _ensureTabObjectsCreated();
        const groupsByTab = { Home: [], Cheats: [], Visual: [], Misc: [] };
        for (const k in MENU_LAYOUT) {
            const entry = MENU_LAYOUT[k];
            const tab = entry.tab || 'Home';
            if (!groupsByTab[tab]) groupsByTab[tab] = [];
            groupsByTab[tab].push(entry);
        }
        for (const tabName in groupsByTab) {
            if (!tabMenuObjects[tabName]) tabMenuObjects[tabName] = { groups: {} };
            if (!tabMenuObjects[tabName].groups) tabMenuObjects[tabName].groups = {};
            const items = groupsByTab[tabName];
            for (let i = 0; i < items.length; i++) {
                const builder = WIDGET_BUILDERS[items[i].type];
                if (!builder) continue;
                const w = builder(items[i]);
                if (w && items[i].key) tabMenuObjects[tabName].groups[items[i].key] = w;
            }
        }
        const qaOverlay = createQuickAccessOverlay({
            x: 40, y: QUICK_ACCESS_TOP_Y,
            step: QUICK_ACCESS_SLOT_STEP, slots: 6,
        });
        if (qaOverlay && qaOverlay.toggleBtn)
            quickAccessUi.toggleBtnWidget = qaOverlay.toggleBtn;
        activateTab(TABS_CONFIG.defaultTab);
    });
    onFrame(function () {
        const now = Date.now();
        beginFrameMemo(now);
    });
    if (typeof globalThis !== 'undefined') {
        globalThis.__nullRythm = {
            base:              base,
            STAGE_PTR:         STAGE_PTR,
            OFFSETS:           OFFSETS,
            SKILL_DB:          SKILL_DB,
            MENU_LAYOUT:       MENU_LAYOUT,
            CONFIG_UI_POPUPS:  CONFIG_UI_POPUPS,
            TABS_CONFIG:       TABS_CONFIG,
            UIPopup:           UIPopup,
            sendPacket:        sendPacket,
            sendSpectateByTag: sendSpectateByTag,
            spectateByTag:     spectateByTag,
            activateTab:       activateTab,
            createStripPopup:  _createStripPopup,
            autododgeMenu:     autododgeMenu,
            hideAutododgeIfOpen: _hideAutododgeIfOpen,
            tabMenuObjects:    tabMenuObjects,
            state:             state,
            config:            config,
            quickAccess: {
                isActive:        _quickAccessIsActive,
                refresh:         _quickAccessRefresh,
                registerTarget:  _quickAccessRegisterTarget,
                open:            _quickAccessOpen,
                toggle:          _quickAccessToggle,
                showHide:        _quickAccessShowHide,
                setSlot:         _quickAccessSetSlot,
                gradientLabel:   _quickAccessGradientLabel,
                colorize:        _quickAccessColorize,
            },
            helpers: {
                isValidPtr:            isValidPtr,
                safeCall:              safeCall,
                strPtr:                strPtr,
                scPtr:                 scPtr,
                asDisplayObject:       _asDisplayObject,
                findChildDeep:         findChildDeep,
                findTextFieldDeep:     findTextFieldDeep,
                findTextFieldAnywhere: _findTextFieldAnywhere,
                setVisible:            setVisible,
                setXYSafe:             setXYSafe,
                safeSetScale:          safeSetScale,
                bringToFront:          bringToFront,
                setInteractive:        _setInteractive,
                setLabel:              _setLabel,
                hideChildByName:       hideChildByName,
                getChildClip:          getChildClip,
                newGameButtonFromClip: newGameButtonFromClip,
                buildPopupChildSpec:   buildPopupChildSpec,
                bumpWidget:            bumpWidget,
                applyTextStyling:      applyTextStyling,
                calculateDistance:     calculateDistance,
                hashTagToId:           hashTagToId,
                extractTypedTag:       extractTypedTag,
            },
            widgets: {
                createButtonWidget:        createButtonWidget,
                createBlueButtonWidget:    createBlueButtonWidget,
                createRedPopoverWidget:    createRedPopoverWidget,
                createTextWidget:          _createTextWidget,
                createInputWidget:         createInputWidget,
                createSliderWidget:        createSliderWidget,
                createToggleWidget:        createToggleWidget,
                createLockRadioWidget:     createLockRadioWidget,
                createGroupWidget:         createGroupWidget,
                createGroupBgWidget:       createGroupBgWidget,
                createQuickAccessButtonWidget: createQuickAccessButtonWidget,
                createQuickAccessOverlay:  createQuickAccessOverlay,
                createCustomTabSprite:     _createCustomTabSprite,
                createTabButton:           createTabButton,
                findSliderVisuals:         findSliderVisuals,
                WIDGET_BUILDERS:           WIDGET_BUILDERS,
            },
            updateMovementHandlers: updateMovementHandlers,
            onFrame:                onFrame,
        };
    }
    try { console.log('[NullRythm] onLibgLoaded complete'); } catch (e) {}
}
function waitForLibg() {
    const check = function check() {
        if (libgLoaded) return;
        const lib = Process.findModuleByName('libg.so');
        if (lib === null || lib === undefined) {
            setTimeout(check, 200);
            return;
        }
        libgLoaded = true;
        libgBase = getAdjustedBase('libg.so');
        const waitForStage = function waitForStage() {
            try {
                const stagePtr = libgBase.add(OFFSETS.stage_instance).readPointer();
                if (stagePtr.isNull()) {
                    setTimeout(waitForStage, 200);
                    return;
                }
            } catch (e) {
                setTimeout(waitForStage, 200);
                return;
            }
            setTimeout(function () { onLibgLoaded(libgBase); }, 200);
        };
        waitForStage();
    };
    check();
}
function main() {
    let pkg;
    try {
        pkg = getPackageName();
        if (pkg) console.log('[NullRythm] package=' + pkg);
        else console.warn('[NullRythm] could not read /proc/self/cmdline');
    } catch (e) {}
    try {
        const base = getAdjustedBase('libg.so');
        if (base) {
            libgBase = base;
            console.log('[NullRythm] libg.so base = ' + base);
        }
    } catch (e) {}
    waitForLibg();
}
main();