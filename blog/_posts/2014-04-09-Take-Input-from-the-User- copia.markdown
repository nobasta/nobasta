---
layout: post
title:  "Take Input from the User"
date:   2014-04-09 20:56:41
categories: marihuana
---

protected void UpdateInput()
{
    // Get the game pad state.
    GamePadState currentState = GamePad.GetState(PlayerIndex.One);
    if (currentState.IsConnected)
    {
        // Rotate the model using the left thumbstick, and scale it down
        modelRotation -= currentState.ThumbSticks.Left.X * 0.10f;

        // Create some velocity if the right trigger is down.
        Vector3 modelVelocityAdd = Vector3.Zero;

        // Find out what direction we should be thrusting, 
        // using rotation.
        modelVelocityAdd.X = -(float)Math.Sin(modelRotation);
        modelVelocityAdd.Z = -(float)Math.Cos(modelRotation);

        // Now scale our direction by how hard the trigger is down.
        modelVelocityAdd *= currentState.Triggers.Right;

        // Finally, add this vector to our velocity.
        modelVelocity += modelVelocityAdd;

        GamePad.SetVibration(PlayerIndex.One, 
            currentState.Triggers.Right,
            currentState.Triggers.Right);


        // In case you get lost, press A to warp back to the center.
        if (currentState.Buttons.A == ButtonState.Pressed)
        {
            modelPosition = Vector3.Zero;
            modelVelocity = Vector3.Zero;
            modelRotation = 0.0f;
        }
    }
}
