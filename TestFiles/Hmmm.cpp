#include <vector>

class RenderableObject
{
public:
    RenderableObject() {}
    RenderableObject(Flint::GraphicsPipeline *pGraphicsPipeline) : pGraphicsPipeline(pGraphicsPipeline) {}
    virtual ~RenderableObject() {}

protected:
    Flint::GraphicsPipeline *pGraphicsPipeline = nullptr;
};

class Player : public RenderableObject
{
    struct PlayerController
    {
        Flint::Matrix44 mModel = Flint::Matrix44::Identity;
    };

public:
    Player() {}
    Player(Flint::GraphicsPipeline *pGraphicsPipeline) : RenderableObject(pGraphicsPipeline) {}
    ~Player() {}

    void Setup()
    {
        Flint::Device *pDevice = pGraphicsPipeline->GetRenderTarget()->GetDevice();
        pSkeletalMesh = pDevice->CreateSkeletalMesh("SkeletalMesh.fbx");
        pSkeletalTexture = pDevice->CreateTexture2D("SkeletalTexture.png");
        pUniformBuffer = pDevice->CreateUniformBuffer(sizeof(PlayerController));

        pGraphicsPipeline->AddToDrawList({pSkeletalMesh}, {pSkeletalTexture}, {pUniformBuffer});
    }

    void Update(float timeStamp)
    {
        mController.mModel = Flint::Matrix44::Identity;
        pUniformBuffer->Update<PlayerController>(mController);
    }

private:
    PlayerController mController = {};

    Flint::SkeletalMesh *pSkeletalMesh = nullptr;
    Flint::Texture2D *pSkeletalTexture = nullptr;
    Flint::UniformBuffer *pUniformBuffer = nullptr;
}; 

class GameEngine
{
public:
    GameEngine() {}
    ~GameEngine() {}

    void Initialize()
    {
        pEngine = Flint::CreateEngine(Flint::BackendAPI::VULKAN, true);

        Flint::DeviceDescriptor descriptor = {};
        descriptor.mDeviceLocation = Flint::DeviceDescriptor::Location::DEDICATED;
        descriptor.bShouldRayTrace = false;

        pDevice = pEngine->CreateDevice({descriptor});
        pRenderTarget = pEngine->CreateScreenBoundRenderTarget(TEXT("Game Engine"), Flint::Vector2(1280.0f, 720.0f), 0);
        pGraphicsPipeline = pRenderTarget->CreateGraphicsPipeline(GetDefaultShaders(), Flint::Vector2(), Flint::Vector2());

        Player player = {pGraphicsPipeline};
        player.Setup();
        player.INSERT_INTO_VECTOR(mPlayers, Player());
    }

    void OnUpdate()
    {
    }

private:
    std::vector<Player> mPlayers;
    Flint::Engine *pEngine = nullptr;
    Flint::Device *pDevice = nullptr;
    Flint::ScreenBoundRenderTarget *pRenderTarget = nullptr;
    Flint::GraphicsPipeline *pGraphicsPipeline = nullptr;
};